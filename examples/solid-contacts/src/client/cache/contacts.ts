import { isServer } from 'solid-js/web'
import { IContact } from '~/server/database/entities/contact'

const cache = (isServer as boolean) ? undefined : createContactsCache()

export function useContactsCache() {
    return cache
}

function createContactsCache() {
    let cache = new Map<string, IContact>()
    let initialized = false

    function init(contacts: IContact[]) {
        initialized = true
        for (let contact of contacts) {
            cache.set(contact.id, contact)
        }
    }

    function getContact(id: string): IContact | undefined {
        return cache.get(id)
    }

    function getAllContacts() {
        return initialized ? [...cache.values()] : undefined
    }

    function saveContact(contact: IContact) {
        cache.set(contact.id, contact)
    }

    function reset() {
        cache = new Map<string, IContact>()
        initialized = false
    }

    function removeContact(id: string) {
        cache.delete(id)
    }

    function removeContacts(ids: string[]) {
        for (let id of ids) {
            cache.delete(id)
        }
    }

    function searchContacts(search?: string) {
        search = (search || '').trim().toLowerCase()
        if (!search) return undefined

        const contacts = getAllContacts()
        if (!contacts) return undefined

        return contacts.filter((contact) => {
            const contactText = (contact.name || '').toLowerCase()
            return contactText.includes(search)
        })
    }

    return {
        initialized: () => initialized,
        init,
        reset,
        getContact,
        getAllContacts,
        saveContact,
        removeContact,
        searchContacts,
        removeContacts,
    }
}
