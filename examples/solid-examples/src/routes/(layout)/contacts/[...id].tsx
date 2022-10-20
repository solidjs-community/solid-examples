import { RouteDataArgs, useRouteData } from 'solid-start'
import { Show } from 'solid-js'
import { useContactsStore } from '~/client/stores/contacts'
import { useFlipAnimation } from '~/components/directives/flip'
import { createCacheableRouteData } from '~/utils'
import { contactsApi } from '~/server/api/contacts'
import ContactDetails from '~/components/ContactDetails'
import AppTitle from '~/components/AppTitle'

export default function ContactDetailsPage() {
    const contact = useRouteData<typeof routeData>()
    const flip = useFlipAnimation

    return (
        <Show when={contact()}>
            <AppTitle title={contact().name} />
            <ContactDetails contact={contact()}></ContactDetails>
        </Show>
    )
}

export function routeData(route: RouteDataArgs) {
    const contactId = route.params.id

    return createCacheableRouteData(() => contactsApi.getContact(contactId), {
        fromCache: () => useContactsStore()?.getContact(contactId),
        toCache: (contact) => useContactsStore()?.saveContact(contact),
    })
}
