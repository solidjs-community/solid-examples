import { RouteDataArgs, useRouteData } from 'solid-start'
import { Show } from 'solid-js'
import { useContactsCache } from '~/client/cache/contacts'
import { createCacheableRouteData } from '~/utils'
import { contactsApi } from '~/server/api/contacts'
import ContactDetails from '~/components/ContactDetails'
import AppTitle from '~/components/AppTitle'

export default function ContactDetailsPage() {
    const contact = useRouteData<typeof routeData>()

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
        fromCache: () => useContactsCache()?.getContact(contactId),
        toCache: (contact) => useContactsCache()?.saveContact(contact),
    })
}
