import { createRouteData, ServerContext } from 'solid-start'
import { createResource, ResourceOptions, useContext } from 'solid-js'
import { isServer } from 'solid-js/web'

export const arrayOrderBy = function <T, K>(
    source: T[] = [],
    keySelector: (item: T) => K & string
): Array<T> {
    if (!Array.isArray(source)) return []

    const copy = [...source]
    copy.sort((a, b) => Intl.Collator().compare(keySelector(a), keySelector(b)))

    return copy
}

export const arrayGroupBy = function <T, K>(
    source: T[] = [],
    keySelector: (item: T) => K
): Array<{ key: K; items: T[] }> {
    if (!Array.isArray(source)) return []

    const groups = [] as Array<{ key: K; items: T[] }>

    for (let item of source) {
        const key = keySelector(item)
        const group = groups.find((x) => x.key === key)
        if (group) {
            group.items.push(item)
        } else {
            groups.push({ key, items: [item] })
        }
    }

    return groups
}

export function unauthorized() {
    return new Response(null, {
        status: 401,
    })
}

export function notFound() {
    return new Response(null, {
        status: 404,
    })
}

export function createCacheableResource<T>(
    fetcher: () => T | Promise<T>,
    options: {
        fromCache?: () => T | Promise<T>
        toCache?: (value: T) => void | Promise<void>
    } = {}
) {
    return createResource(
        async () => {
            let data = options.fromCache?.()
            if (data) return data

            data = await fetcher()

            if (!(data instanceof Response)) {
                options.toCache?.(data)
            }

            return data
        },
        {
            onHydrated: (_, { value }) => {
                options.toCache?.(value)
            },
        }
    )
}

export function debounce<T>(
    func: (value: T) => void,
    options: {
        timeout?: number
        immediate?: (value: T) => boolean
    } = {}
) {
    let timer
    return (value: T, immediate?: boolean) => {
        clearTimeout(timer)

        if (immediate || options.immediate?.(value)) {
            func(value)
            return
        }

        timer = setTimeout(() => {
            func(value)
        }, options.timeout || 300)
    }
}

export function createUrl(
    path: string,
    params: { [key: string]: string | boolean }
) {
    const origin = isServer
        ? new URL(useContext(ServerContext).request.url).origin
        : window.location.origin
    const url = new URL(path, origin)

    for (let [key, value] of Object.entries(params)) {
        url.searchParams.set(key, `${value}`)
        if (value === 'false' || value === false) {
            url.searchParams.delete(key)
        }
    }

    return url.pathname + url.search
}

export function createCacheableRouteData<T, S = unknown>(
    fetcher: () => T | Promise<T>,
    options: ResourceOptions<T> & {
        fromCache?: (source: S) => T | Promise<T>
        toCache?: (value: T) => void | Promise<void>
        key?: S extends Function
            ? never
            :
                  | S
                  | false
                  | null
                  | undefined
                  | (() => S | false | null | undefined)
    } = {}
) {
    return createRouteData(
        async () => {
            if (!isServer && options.fromCache) {
                const source =
                    typeof options.key === 'function'
                        ? options.key()
                        : options.key
                const data = await options.fromCache(source)
                if (data) return data
            }

            const data = await fetcher()

            if (data instanceof Response) return data

            if (!isServer && options.toCache) {
                await options.toCache(data)
            }

            return data
        },
        {
            ...options,
            onHydrated: (_, { value }) => {
                options.toCache?.(value)
            },
        }
    )
}
