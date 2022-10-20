import { FormError } from 'solid-start/data'

export interface IContact {
    id: string
    name: string
    email?: string
    phone?: string
    favorite?: boolean
    ownerUserId: string
}

export const ContactFactory = {
    fromForm(form: FormData, ownerUserId: string): IContact | FormError {
        const fields = {
            name: form.get('name') as string,
            email: form.get('email') as string,
            phone: form.get('phone') as string,
        }

        const fieldErrors = {
            name: validateName(fields.name),
            email: validateEmail(fields.email),
            phone: validatePhone(fields.phone),
        }

        if (Object.values(fieldErrors).some(Boolean)) {
            return new FormError('Your form contains errors', {
                fieldErrors,
                fields,
            })
        }

        return {
            id: crypto.randomUUID(),
            ownerUserId,
            ...fields,
        }
    },
}

function normalizeString(value: string) {
    return typeof value !== 'string' ? `${value || ''}` : value
}

function validateName(value: string) {
    value = normalizeString(value)
    if (value.length === 0) {
        return `Name is required`
    }
    if (value.length > 64) {
        return `Name is longer than 64 characters`
    }
}

function validatePhone(value: string) {
    value = normalizeString(value)
    if (value.length > 32) {
        return `Phone is longer than 32 characters`
    }
}

function validateEmail(value: string) {
    value = normalizeString(value)
    if (value.length > 64) {
        return `Email is longer than 64 characters`
    }
    if (
        value.length > 1 &&
        !value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        return 'Email address is invalid'
    }
}
