import { useFlipAnimation } from '~/components/directives/flip'
import { onMount, Show, useContext, VoidProps } from 'solid-js'
import Avatar from '~/components/Avatar'
import {
    Navigator,
    Params,
    useNavigate,
    useSearchParams,
} from '@solidjs/router'
import { IContact } from '~/server/database/entities/contact'
import { contactsApi } from '~/server/api/contacts'
import { createRouteAction, ServerContext, useLocation } from 'solid-start'
import { useContactsCache } from '~/client/cache/contacts'
import { Dynamic, isServer } from 'solid-js/web'
import Button from '~/components/Button'
import ChevronLeftIcon from '~/components/icons/ChevronLeftIcon'
import PhoneIcon from '~/components/icons/PhoneIcon'
import EnvelopeIcon from '~/components/icons/EnvelopeIcon'
import StarIcon from '~/components/icons/StarIcon'
import StarSolidIcon from '~/components/icons/StarSolidIcon'
import PencilIcon from '~/components/icons/PencilIcon'
import TrashIcon from '~/components/icons/TrashIcon'

export default function ContactDetails(
    props: VoidProps<{ contact: IContact }>
) {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const flip = useFlipAnimation('ContactDetails')
    const location = useLocation()

    const [deleteAction, { Form: DeleteForm }] = createRouteAction(
        contactsApi.deleteContact,
        {
            invalidate: () =>
                useContactsCache()?.removeContact(props.contact.id),
        }
    )

    const [favoriteAction, { Form: FavoriteForm }] = createRouteAction(
        contactsApi.favoriteContact,
        {
            invalidate: () =>
                useContactsCache()?.saveContact({
                    ...props.contact,
                    favorite: favoriteAction.input?.get('favorite') === 'true',
                }),
        }
    )

    const isFavorite = () =>
        favoriteAction.pending
            ? favoriteAction.input.get('favorite') === 'true'
            : props.contact.favorite

    function confirmDeleting(e: SubmitEvent) {
        const confirmed = confirm(
            'Are you sure you want to delete this contact?'
        )
        if (!confirmed) e.preventDefault()
    }

    function backButtonLink() {
        if (!isServer) return undefined

        let previousUrl =
            useContext(ServerContext).request.headers.get('referer')
        if (!previousUrl) return '/'

        const previousPathname = new URL(previousUrl).pathname

        if (previousPathname.endsWith('edit')) return '/'
        if (previousPathname.endsWith('create')) return '/'
        if (previousPathname === location.pathname) return '/'

        return previousUrl
    }

    const showAnimation = () => {
        if (isServer) {
            let previousUrl =
                useContext(ServerContext).request.headers.get('referer')
            if (!previousUrl) return true
            return new URL(previousUrl).pathname !== location.pathname
        }
        return true
    }

    onMount(() => {
        doNavigationHack(params, navigate)
    })

    return (
        <div
            class="p-2 "
            classList={{ 'animate-appear': showAnimation() }}
        >
            <div class="h-20 sticky top-0 bg-background pt-2">
                <Button
                    label="Navigate Back"
                    onClick={() => navigate(-1)}
                    href={backButtonLink()}
                    icon
                >
                    <ChevronLeftIcon class="w-6 h-6" />
                </Button>
            </div>
            <div class="bg-surface rounded-3xl space-y-4 flex justify-center items-center flex-col px-6 py-4 mb-6">
                <Avatar
                    text={props.contact.name[0]}
                    colorCode={
                        props.contact.name[props.contact.name.length - 2]
                    }
                    size="large"
                    ref={(el) =>
                        flip(el, () => `contact${props.contact.id}.avatar`)
                    }
                ></Avatar>
                <h1
                    class="inline-block text-3xl font-medium mb-4 text-center"
                    use:flip={`contact${props.contact.id}.name`}
                >
                    {props.contact.name}
                </h1>
                <ul class="pt-4 space-y-2">
                    <li class="text-light text-lg flex items-center space-x-4">
                        <EnvelopeIcon class="w-4 h-4" />
                        <span> {props.contact.email}</span>
                    </li>
                    <span class="text-light text-lg flex items-center space-x-4">
                        <PhoneIcon class="w-4 h-4" />
                        <span> {props.contact.phone}</span>
                    </span>
                </ul>
                <div class="flex justify-center items-center space-x-6 pt-10">
                    <Show when={props.contact.email}>
                        <Button
                            label="Send Email"
                            icon
                            href={`mailto:${props.contact.email}`}
                        >
                            <EnvelopeIcon class="w-6 h-6 m-2"></EnvelopeIcon>
                        </Button>
                    </Show>
                    <Show when={props.contact.phone}>
                        <Button
                            icon
                            href={`tel:${props.contact.phone}`}
                            label="Make Call"
                        >
                            <PhoneIcon class="w-6 h-6 m-2"></PhoneIcon>
                        </Button>
                    </Show>
                </div>
            </div>
            <div class="flex items-center space-x-10 justify-around coarse:fixed coarse:bottom-0 coarse:left-0 h-16 w-full px-6">
                <Button
                    label="Edit Contact"
                    href={`/contacts/${props.contact.id}/edit`}
                    class="flex items-center justify-center flex-col space-y-1.5 !rounded-2xl"
                >
                    <PencilIcon class="w-6 h-6"></PencilIcon>
                    <span class="text-xs">Edit</span>
                </Button>
                <FavoriteForm>
                    <input
                        type="hidden"
                        name="favorite"
                        value={isFavorite() ? 'false' : 'true'}
                    />
                    <input
                        type="hidden"
                        name="contactId"
                        value={props.contact.id}
                    />
                    <Button
                        label="Favorite Contact"
                        type="submit"
                        class="flex items-center justify-center flex-col space-y-1.5 !rounded-2xl"
                    >
                        <Dynamic
                            component={isFavorite() ? StarSolidIcon : StarIcon}
                            class="w-6 h-6"
                            classList={{ 'text-yellow-500': isFavorite() }}
                        ></Dynamic>
                        <span class="text-xs">Favorite</span>
                    </Button>
                </FavoriteForm>
                <DeleteForm onSubmit={confirmDeleting}>
                    <input
                        type="hidden"
                        name="contactId"
                        value={props.contact.id}
                    />
                    <Button
                        label="Delete Contact"
                        type="submit"
                        class="flex items-center justify-center flex-col space-y-1.5 !rounded-2xl"
                    >
                        <TrashIcon class="w-6 h-6"></TrashIcon>
                        <span class="text-xs">
                            {deleteAction.pending ? 'Deleting' : 'Delete'}
                        </span>
                    </Button>
                </DeleteForm>
            </div>
        </div>
    )
}

function doNavigationHack(params: Params, navigate: Navigator) {
    // This is a hack to address a nasty navigation behavior on mobile for the following workflow:
    // Home Page -> Contact Details -> Contact Editing -> Contact Details (auto-redirected after saving)
    // The code below will revert the navigation history back to:
    // Home Page -> Contact Details
    // Which means if the user now clicks on the back button, they will land on the "Home Page" instead of the "Contact Editing" page

    if (!isServer && params.saved === 'true') {
        navigate(-1)
    }
}
