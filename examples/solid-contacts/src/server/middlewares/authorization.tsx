import { MiddlewareInput } from 'solid-start/entry-server/StartServer'
import { FetchEvent } from 'solid-start/server/types'
import { unauthorized } from '~/utils'
import { redirect } from 'solid-start/server/browser'

const publicUrls = ['/_m/src/server/api/auth.tsx/1/login', '/login']

export const useAuthorization = ({ forward }: MiddlewareInput) => {
    return async (event: FetchEvent) => {
        const pathname = new URL(event.request.url).pathname

        if (!event.env.currentUser && !publicUrls.includes(pathname)) {
            const isServerFunctionCall = pathname.startsWith('/_m')

            return isServerFunctionCall
                ? unauthorized()
                : redirectToLogin(pathname)
        }

        return forward(event)
    }
}

function redirectToLogin(currentPath: string) {
    let redirectUrl = '/login'

    if (currentPath !== '/') {
        const searchParams = new URLSearchParams()
        searchParams.set('redirectTo', currentPath)
        redirectUrl += `?${searchParams.toString()}`
    }

    return redirect(redirectUrl)
}
