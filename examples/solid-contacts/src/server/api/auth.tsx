import { UserFactory } from '~/server/database/entities/user'
import { FormError } from 'solid-start/data'
import { session } from '~/server/session'
import { db } from '~/server/database/db'
import { redirect } from 'solid-start/server/browser'
import server$ from 'solid-start/server'

export const authApi = {
    getCurrentUser: server$(async () => {
        return server$.env.currentUser
    }),

    login: server$(async (form: FormData) => {
        const request = server$.request
        let userData = UserFactory.fromForm(form)
        if (userData instanceof FormError) throw userData

        const currentSession = await session.getCurrentUser(request)
        if (currentSession) await session.destroySession(request)

        const user =
            (await db.getUser(userData.username)) ||
            (await db.createUser(userData.username))
        const newSession = await session.createSession(user.username)

        const redirectTo = (form.get('redirectTo') as string) || '/'

        return redirect(redirectTo, {
            headers: {
                'Set-Cookie': newSession.cookies,
            },
        })
    }),

    logout: server$(async (_: FormData) => {
        const result = await session.destroySession(server$.request)
        return redirect('/login', {
            headers: {
                'Set-Cookie': result.cookies,
            },
        })
    }),
}
