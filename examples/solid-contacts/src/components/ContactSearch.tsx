import { useNavigate, useSearchParams } from '@solidjs/router'
import { useLocation } from 'solid-start'
import { useAutoFocus } from '~/components/directives/autofocus'
import { createCacheableRouteData, debounce } from '~/utils'
import { contactsApi } from '~/server/api/contacts'
import { For, Show } from 'solid-js'
import ContactListItem from '~/components/ContactListItem'
import { useContactsStore } from '~/client/stores/contacts'
import Button from '~/components/Button'
import { isServer } from 'solid-js/web'
import ChevronLeftIcon from '~/components/icons/ChevronLeftIcon'
import CloseIcon from '~/components/icons/CloseIcon'

export default function ContactSearch() {
    const location = useLocation()
    const navigate = useNavigate()
    const autofocus = useAutoFocus()
    const [params] = useSearchParams()
    const search = () => (params.search || '') as string

    const searchResults = createCacheableRouteData(
        () => contactsApi.searchContacts(search()),
        {
            key: () => search(),
            initialValue: [],
            fromCache: (search) =>
                search ? searchContactsFromCache(search) : [],
        }
    )

    const handleInput = debounce(
        (search: string) => {
            const url = new URL(location.pathname, window.location.origin)
            if (search) url.searchParams.set('search', search)
            navigate(`${url.pathname}${url.search}`, { replace: true })
        },
        {
            immediate: (value) => !value,
        }
    )

    function handleSubmit() {
        return (e: SubmitEvent) => {
            e.preventDefault()
            handleInput(
                ((e.target as HTMLFormElement).children[1] as HTMLInputElement)
                    .value,
                true
            )
        }
    }

    return (
        <div
            class="py-2"
            classList={{ 'animate-appear': !isServer }}
        >
            <div class="flex items-center h-16 sticky top-0 bg-background mb-6">
                <h1 class="sr-only">Search Contacts</h1>
                <div>
                    <Button
                        label="Navigate Back"
                        onClick={() => navigate(-1)}
                        href={isServer ? '/' : undefined}
                        icon
                    >
                        <ChevronLeftIcon class="w-6 h-6" />
                    </Button>
                </div>
                <form
                    method="get"
                    onReset={() => handleInput('')}
                    onSubmit={handleSubmit()}
                    class="flex-grow flex items-center space-x-2 mx-2"
                >
                    <button type="submit"></button>
                    <input
                        name="search"
                        onInput={(e) =>
                            handleInput((e.target as HTMLInputElement).value)
                        }
                        class="h-12 w-full bg-background flex-grow"
                        use:autofocus
                        autofocus
                        type="text"
                        maxLength="128"
                        placeholder="Search Contacts"
                        value={search()}
                    />
                    <Button
                        label="Clear Search Input"
                        icon
                        class="text-light"
                        classList={{ hidden: isServer, invisible: !search() }}
                        onClick={() => handleInput('')}
                    >
                        <CloseIcon class="w-6 h-6" />
                    </Button>
                </form>
            </div>
            <Show when={searchResults().length}>
                <div class="h-10 flex items-center justify-between px-6">
                    <span class="text-light text-sm">Contacts</span>
                    <span class="text-light text-sm">{`${
                        searchResults().length
                    } found`}</span>
                </div>
                <For each={searchResults()}>
                    {(contact, index) => (
                        <ContactListItem
                            contact={contact}
                            roundTop={index() === 0}
                            roundBottom={index() === searchResults().length - 1}
                        ></ContactListItem>
                    )}
                </For>
            </Show>
            <Show when={searchResults().length === 0 && search().length > 0}>
                <span class="text-light block flex justify-center pt-16">
                    No contacts found
                </span>
            </Show>
        </div>
    )
}

async function searchContactsFromCache(search?: string) {
    if (!search) return []
    const store = useContactsStore()

    if (!store.initialized()) {
        const contacts = await contactsApi.getAllContacts()
        store.init(contacts)
    }

    return store.searchContacts(search)
}
