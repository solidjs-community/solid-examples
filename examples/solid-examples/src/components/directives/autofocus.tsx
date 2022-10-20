import { onMount } from 'solid-js'

declare module 'solid-js' {
    namespace JSX {
        interface Directives {
            autofocus: boolean
        }
    }
}

export function useAutoFocus() {
    return (el: HTMLElement) => {
        onMount(() => {
            el.focus()
        })
    }
}
