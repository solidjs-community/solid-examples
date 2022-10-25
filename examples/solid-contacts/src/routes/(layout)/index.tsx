import { useRouteData } from '@solidjs/router'
import { Show } from 'solid-js'
import { createCacheableRouteData } from '~/utils'
import { useContactsCache } from '~/client/cache/contacts'
import { contactsApi } from '~/server/api/contacts'
import ContactList from '~/components/ContactList'
import AppTitle from '~/components/AppTitle'

export default function Home() {
    const contacts = useRouteData<typeof routeData>()

    return (
        <Show when={contacts()}>
            <AppTitle title="Home" />
            <ContactList contacts={contacts()} />
        </Show>
    )
}

export function routeData() {
    return createCacheableRouteData(contactsApi.getAllContacts, {
        fromCache: () => useContactsCache()?.getAllContacts(),
        toCache: (contacts) => useContactsCache()?.init(contacts),
    })
}
