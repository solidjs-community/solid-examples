import { createMemo, createSignal, For, VoidProps } from 'solid-js'
import { IContact } from '~/server/database/entities/contact'
import { arrayGroupBy, arrayOrderBy, createUrl } from '~/utils'
import ContactListItem from '~/components/ContactListItem'
import { contactsApi } from '~/server/api/contacts'
import { useNavigate, useSearchParams } from '@solidjs/router'
import { useContactsStore } from '~/client/stores/contacts'
import SearchIcon from '~/components/icons/SearchIcon'
import UserPlusIcon from '~/components/icons/UserPlusIcon'
import CheckIcon from '~/components/icons/CheckIcon'
import { Dynamic, isServer } from 'solid-js/web'
import Button from '~/components/Button'
import SolidLogo from '~/components/icons/SolidLogo'
import MenuIcon from '~/components/icons/MenuIcon'
import TrashIcon from '~/components/icons/TrashIcon'
import { createStore } from 'solid-js/store'
import { createRouteAction } from 'solid-start'

export default function ContactList(
    props: VoidProps<{ contacts: IContact[] }>
) {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [contacts, setContacts] = createStore(props.contacts || [])
    const [selectedCount, setSelectedCount] = createSignal(0)
    const contactGroups = createMemo(() => groupContacts(contacts))
    const allSelected = createMemo(() => selectedCount() === contacts.length)
    const selectionMode = () => params.delete === 'true'
    const showMenu = () => params.menu === 'true'
    const [globalSelected, setGlobalSelected] = createSignal<
        boolean | undefined
    >(undefined)

    const [deleteFormState, { Form: DeleteForm }] = createRouteAction(
        contactsApi.deleteContacts,
        {
            invalidate: () => {
                const selectedContactIds = [...deleteFormState.input.keys()]
                setSelectedCount(0)
                setContacts((list) =>
                    list.filter((x) => !selectedContactIds.includes(x.id))
                )
                useContactsStore()?.removeContacts(selectedContactIds)
                navigate(createUrl('/', { delete: false }), { replace: true })
            },
        }
    )

    const menuButton = () => ({
        href: createUrl('/', { menu: !showMenu() }),
        onClick: (e: MouseEvent) => {
            e.preventDefault()
            navigate(createUrl('/', { menu: !showMenu() }), {
                replace: true,
            })
        },
    })

    const actionButtons = () => [
        {
            title: 'Search Contacts',
            href: '/contacts/search',
            icon: SearchIcon,
        },
        {
            title: 'Add Contact',
            href: '/contacts/create',
            icon: UserPlusIcon,
        },
        {
            title: 'Delete Contacts',
            href: createUrl('/', { delete: true }),
            icon: TrashIcon,
            onClick: (e: MouseEvent) => {
                e.preventDefault()
                setGlobalSelected(undefined)
                navigate(createUrl('/', { delete: true }), { replace: true })
            },
        },
    ]

    function handleSelectSingle(e: Event) {
        const selected = (e.target as HTMLInputElement).checked
        if (selected) setSelectedCount((value) => value + 1)
        else setSelectedCount((value) => value - 1)
    }

    function handleDeleteMultiple() {
        return (e: MouseEvent) => {
            if (selectedCount() === 0) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            const confirmed = confirm(
                `You are about to delete ${selectedCount()} contacts. Confirm?`
            )
            if (!confirmed) {
                e.preventDefault()
                e.stopPropagation()
            }
        }
    }

    function handleSelectAll() {
        return (e: MouseEvent) => {
            e.preventDefault()
            const allSelected = globalSelected() === true
            setSelectedCount(allSelected ? 0 : contacts.length)
            setGlobalSelected(!allSelected)
        }
    }

    function handleClearSelection() {
        return (e) => {
            e.preventDefault()
            setSelectedCount(0)
            navigate(createUrl('/', { delete: false }), { replace: true })
        }
    }

    return (
        <>
            <div class="h-36 flex items-center justify-center flex-col space-y-2">
                <div
                    class="rounded-full flex items-center justify-center w-12 h-12 bg-surface p-2"
                    classList={{ invisible: selectionMode() && !isServer }}
                >
                    <SolidLogo></SolidLogo>
                </div>
                <h1 class="block text-3xl">
                    {selectionMode() && !isServer
                        ? `${selectedCount()} selected`
                        : 'Contacts'}
                </h1>
            </div>
            <div
                class="flex items-center h-12 px-4 sticky top-0 bg-background mb-4 space-x-4"
                classList={{ hidden: selectionMode() }}
            >
                <Button
                    label="Show Menu"
                    class="md:hidden"
                    icon
                    href={menuButton().href}
                    onClick={menuButton().onClick}
                >
                    <MenuIcon class="w-6 h-6"></MenuIcon>
                </Button>

                <div class="flex-grow"></div>
                <For each={actionButtons()}>
                    {(button) => (
                        <Button
                            label={button.title}
                            icon
                            href={button.href}
                            onClick={button.onClick}
                        >
                            <Dynamic
                                component={button.icon}
                                class="w-6 h-6 text-red"
                            />
                        </Button>
                    )}
                </For>
            </div>
            <DeleteForm>
                <div
                    class="flex items-center space-x-2 h-12 px-8 sticky top-0 bg-background mb-4"
                    classList={{ hidden: !selectionMode() }}
                >
                    <button
                        onClick={handleSelectAll()}
                        disabled={deleteFormState.pending}
                        classList={{ hidden: isServer }}
                        class="block rounded-full flex items-center justify-center border w-6 h-6 hover:bg-surface active:bg-surface-high mr-6"
                    >
                        <CheckIcon
                            class="w-5 h-5"
                            classList={{ hidden: !allSelected() }}
                        ></CheckIcon>
                    </button>
                    <Button
                        label="Confirm Delete"
                        type="submit"
                        loading={deleteFormState.pending}
                        onClick={handleDeleteMultiple()}
                    >
                        {deleteFormState.pending ? 'Deleting' : 'Delete'}
                    </Button>
                    <Button
                        label="Cancel Delete"
                        onClick={handleClearSelection()}
                        disabled={deleteFormState.pending}
                        href={isServer ? '/' : undefined}
                    >
                        Cancel
                    </Button>
                </div>
                <div class="space-y-6 px-2 pt-4 min-w-[300px]">
                    <For each={contactGroups()}>
                        {(group) => (
                            <div>
                                <span class="text-light block pl-6 pb-2">
                                    {group.title}
                                </span>
                                <ol>
                                    <For each={group.contacts}>
                                        {(contact, index) => (
                                            <li>
                                                <Dynamic
                                                    component={
                                                        selectionMode()
                                                            ? 'label'
                                                            : 'div'
                                                    }
                                                >
                                                    <span class="sr-only">
                                                        {contact.name}
                                                    </span>
                                                    <ContactListItem
                                                        roundTop={index() === 0}
                                                        roundBottom={
                                                            index() ===
                                                            group.contacts
                                                                .length -
                                                                1
                                                        }
                                                        contact={contact}
                                                        noLink={selectionMode()}
                                                        prependSlot={
                                                            selectionMode() && (
                                                                <input
                                                                    name={
                                                                        contact.id
                                                                    }
                                                                    checked={
                                                                        globalSelected() ===
                                                                        undefined
                                                                            ? undefined
                                                                            : globalSelected()
                                                                    }
                                                                    type="checkbox"
                                                                    class="block accent-primary-500 w-4 h-4 bg-pink rounded-3xl"
                                                                    onChange={
                                                                        handleSelectSingle
                                                                    }
                                                                ></input>
                                                            )
                                                        }
                                                    ></ContactListItem>
                                                </Dynamic>
                                            </li>
                                        )}
                                    </For>
                                </ol>
                            </div>
                        )}
                    </For>
                </div>
            </DeleteForm>
        </>
    )
}

function groupContacts(contacts: IContact[]) {
    const orderedContacts = arrayOrderBy(contacts, (x) => x.name)

    const groups = arrayGroupBy(orderedContacts, (x) => x.name[0]).map(
        (group) => ({
            title: group.key[0],
            contacts: group.items,
        })
    )

    const favorites = contacts.filter((x) => x.favorite)
    if (favorites.length) {
        groups.splice(0, 0, {
            title: 'Favorites',
            contacts: favorites,
        })
    }
    return groups
}
