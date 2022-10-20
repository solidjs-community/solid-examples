import { useRouteData } from '@solidjs/router'
import { Show } from 'solid-js'
import { createCacheableRouteData } from '~/utils'
import { useContactsStore } from '~/client/stores/contacts'
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
        fromCache: () => useContactsStore()?.getAllContacts(),
        toCache: (contacts) => useContactsStore()?.init(contacts),
    })
}
