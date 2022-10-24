import { isServer } from 'solid-js/web'
import { IUser } from '~/server/database/entities/user'

const cache = isServer ? undefined : createAuthCache()

export function useAuthCache() {
    return cache
}

function createAuthCache() {
    let currentUser: IUser

    function init(user: IUser) {
        currentUser = user
    }

    function getCurrentUser() {
        return currentUser
    }

    function reset() {
        currentUser = undefined
    }

    return {
        initialized: () => !!currentUser,
        init,
        getCurrentUser,
        reset,
    }
}
