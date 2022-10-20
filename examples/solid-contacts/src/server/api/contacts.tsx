import server$ from 'solid-start/server'
import { redirect } from 'solid-start/server/browser'
import { db } from '~/server/database/db'
import { notFound } from '~/utils'
import { ContactFactory } from '~/server/database/entities/contact'
import { FormError } from 'solid-start/data'

export const contactsApi = {
    getContact: (id: string) =>
        server$(
            async (id: string) =>
                await db.getContactForUser(
                    server$.env.currentUser!.username,
                    id
                )
        )(id),

    getAllContacts: server$(
        async () =>
            await db.getContactsForUser(server$.env.currentUser!.username)
    ),

    searchContacts: (search: string) =>
        server$(async (search: string) => {
            search = (search || '').trim().toLowerCase()
            if (!search) return []

            return (
                await db.getContactsForUser(server$.env.currentUser.username)
            ).filter((contact) => {
                const contactText = (contact.name || '').toLowerCase()
                return contactText.includes(search)
            })
        })(search),

    deleteContact: server$(async (form: FormData) => {
        const contactId = form.get('contactId') as string
        const contact = await db.getContactForUser(
            server$.env.currentUser.username,
            contactId
        )
        if (!contact) return notFound()

        await db.deleteContact(contactId)

        return redirect('/')
    }),

    deleteContacts: server$(async (form: FormData) => {
        const contactIds = [...form.entries()]
            .filter(([_, value]) => value === 'on')
            .map(([key]) => key)

        const contacts = await db.getContactsForUser(
            server$.env.currentUser.username,
            contactIds
        )

        await db.deleteContacts(contacts.map((x) => x.id))

        return redirect('/')
    }),

    favoriteContact: server$(async (form: FormData) => {
        const contactId = form.get('contactId') as string
        const contact = await db.getContactForUser(
            server$.env.currentUser.username,
            contactId
        )
        if (!contact) return notFound()

        const favorite = form.get('favorite') === 'true'
        await db.favoriteContact(contact.id, favorite)

        return redirect(`/contacts/${contact.id}`)
    }),

    createContact: server$(async (form: FormData) => {
        const env = server$.env
        const contactData = ContactFactory.fromForm(
            form,
            env.currentUser!.username
        )

        if (contactData instanceof FormError) throw contactData

        const newContact = await db.createContact(contactData)
        return redirect(`/contacts/${newContact.id}`)
    }),

    editContact: server$(async (form: FormData) => {
        const env = server$.env
        const contactData = ContactFactory.fromForm(
            form,
            env.currentUser!.username
        )

        if (contactData instanceof FormError) throw contactData
        const contactId = (form.get('contactId') as string) || ''

        const contact = await db.getContactForUser(
            env.currentUser!.username,
            contactId
        )

        if (!contact) return notFound()

        const updatedContact = await db.updateContact(contactId, contactData)

        return redirect(`/contacts/${updatedContact.id}?saved=true`)
    }),
}
