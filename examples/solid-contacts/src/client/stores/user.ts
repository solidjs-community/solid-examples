import { isServer } from 'solid-js/web'
import { IUser } from '~/server/database/entities/user'

const store = isServer ? undefined : createUserStore()

export function useUserStore() {
    return store
}

function createUserStore() {
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

// const instance = isServer ? undefined : createUserStore()
//
// export function useUserStore() {
//     return instance
// }
//
// function createUserStore() {
//
//     let [store, setStore] = createStore({
//         currentUser: undefined as undefined | IUser
//     })
//
//     function init(user: IUser) {
//         setStore({ currentUser: user})
//     }
//
//     function getCurrentUser() {
//         return store.currentUser
//     }
//
//     function reset() {
//         setStore({})
//     }
//
//     return {
//         initialized: () => !!store.currentUser,
//         init,
//         getCurrentUser,
//         reset,
//     }
// }
