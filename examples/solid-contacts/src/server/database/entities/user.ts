import { FormError } from 'solid-start/data'

export interface IUser {
    username: string
}

export const UserFactory = {
    fromForm(form: FormData): IUser | FormError {
        const fields = {
            username: form.get('username') as string,
        }
        const fieldErrors = {
            username: validateUsername(fields.username),
        }

        if (Object.values(fieldErrors).some(Boolean)) {
            return new FormError('Your form contains errors', {
                fieldErrors,
                fields,
            })
        }

        return {
            ...fields,
        }
    },
}

function normalizeString(value: string) {
    return typeof value !== 'string' ? `${value || ''}` : value
}

function validateUsername(value: string) {
    value = normalizeString(value)
    if (value.length < 3) {
        return `Username must be at least 3 characters long`
    }
}
