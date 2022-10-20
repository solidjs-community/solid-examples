import { useRouteData, useSearchParams } from '@solidjs/router'
import { Outlet } from 'solid-start'
import { useUserStore } from '~/client/stores/user'
import { createCacheableRouteData } from '~/utils'
import { authApi } from '~/server/api/auth'
import { createRouteAction } from 'solid-start/data'
import { useContactsStore } from '~/client/stores/contacts'
import SearchIcon from '~/components/icons/SearchIcon'
import Button from '~/components/Button'
import UserPlusIcon from '~/components/icons/UserPlusIcon'
import LogoutIcon from '~/components/icons/LogoutIcon'
import HomeIcon from '~/components/icons/HomeIcon'
import { isServer } from 'solid-js/web'

export default function Protected() {
    const user = useRouteData<typeof routeData>()
    const [params] = useSearchParams()
    const showMenu = () => params.menu === 'true'

    const [, { Form: LogoutForm }] = createRouteAction(authApi.logout, {
        invalidate: () => {
            useUserStore().reset()
            useContactsStore().reset()
        },
    })

    return (
        <div class="grid grid-cols-[auto,1fr] max-w-[1024px] mx-auto">
            <div class="h-screen py-4 sticky top-0">
                <aside
                    class="relative hidden md:block space-y-6 w-[250px]  mr-4 bg-surface rounded-3xl px-6 py-12 h-full rounded-3xl text-center"
                    classList={{
                        '!block': showMenu(),
                        'animate-appear-left': !isServer,
                    }}
                >
                    <header class="text-2xl pb-12">
                        Hi, {user()?.username}.
                    </header>
                    <Button
                        label="Home Page"
                        href="/"
                        outline
                        class="flex items-center space-x-4 "
                    >
                        <HomeIcon class="w-4 h-4"></HomeIcon>
                        <span class="text-lg">Contacts</span>
                    </Button>
                    <Button
                        label="Search Page"
                        href="/contacts/search"
                        outline
                        class="flex items-center space-x-4"
                    >
                        <SearchIcon class="w-4 h-4"></SearchIcon>
                        <span class="text-light text-lg">Search...</span>
                    </Button>
                    <Button
                        label="Create Contact Page"
                        href="/contacts/create"
                        class="w-full flex items-center space-x-4"
                        primary
                    >
                        <UserPlusIcon class="w-4 h-4"></UserPlusIcon>
                        <span>Add Contact</span>
                    </Button>
                    <div class="flex items-center absolute bottom-6 w-full left-0 h-16 px-4">
                        <LogoutForm class="w-full">
                            <Button
                                label="Logout"
                                type="submit"
                                class="w-full space-x-4 flex items-center justify-center"
                            >
                                <LogoutIcon class="w-6 h-6"></LogoutIcon>
                                <span>Logout</span>
                            </Button>
                        </LogoutForm>
                    </div>
                </aside>
            </div>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export function routeData() {
    return createCacheableRouteData(authApi.getCurrentUser, {
        fromCache: () => useUserStore()?.getCurrentUser(),
        toCache: (user) => useUserStore()?.init(user),
    })
}
