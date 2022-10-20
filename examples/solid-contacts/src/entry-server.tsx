import { renderAsync as useRender, StartServer } from 'solid-start/entry-server'
import { inlineServerFunctions as useServerFunctions } from 'solid-start/server/middleware'
import { useAuthorization } from '~/server/middlewares/authorization'
import { useAuthentication } from '~/server/middlewares/authentication'
import { createServer } from '~/server/start'

export default createServer(
    useAuthentication,
    useAuthorization,
    useServerFunctions,
    useRender((event) => <StartServer event={event} />)
)
