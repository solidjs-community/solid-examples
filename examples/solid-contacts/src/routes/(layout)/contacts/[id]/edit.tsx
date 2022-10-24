import { RouteDataArgs, useRouteData } from 'solid-start'
import { Show } from 'solid-js'
import { useContactsCache } from '~/client/cache/contacts'
import { ContactForm } from '~/components/ContactForm'
import { createCacheableRouteData } from '~/utils'
import { contactsApi } from '~/server/api/contacts'
import AppTitle from '~/components/AppTitle'

export default function EditContact() {
    const contact = useRouteData<typeof routeData>()

    return (
        <Show when={contact()}>
            <AppTitle title={`Edit - ${contact().name}`} />
            <ContactForm contact={contact()}></ContactForm>
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
