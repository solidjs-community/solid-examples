import { composeMiddleware } from 'solid-start/entry-server'
import {
    Middleware,
    MiddlewareInput,
} from 'solid-start/entry-server/StartServer'
import { FetchEvent } from 'solid-start/server/types'

export function createServer(...middlewares: Middleware[]) {
    return (event: FetchEvent) => {
        return composeMiddleware(middlewares)(notFoundMiddleware)(event)
    }
}

const notFoundMiddleware: MiddlewareInput = {
    forward: async (_) => {
        return new Response(null, {
            status: 404,
        })
    },
}
