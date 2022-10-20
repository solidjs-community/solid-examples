import { createCookieSessionStorage } from 'solid-start/session'
import { db } from '~/server/database/db'

const sessionSecret = import.meta.env.SESSION_SECRET

const storage = createCookieSessionStorage({
    cookie: {
        name: 'RJ_session',
        // secure doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: true,
        secrets: [sessionSecret ?? 'dev'],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

async function getCurrentUser(request: Request) {
    const session = await storage.getSession(request.headers.get('Cookie'))

    const username = session.get('username')
    if (!username) return undefined

    return db.getUser(username)
}

async function createSession(username: string) {
    const session = await storage.getSession()
    session.set('username', username)

    return {
        cookies: await storage.commitSession(session),
    }
}

export async function destroySession(request: Request) {
    const session = await storage.getSession(request.headers.get('Cookie'))

    return {
        cookies: await storage.destroySession(session),
    }
}

export const session = {
    getCurrentUser,
    createSession,
    destroySession,
}
