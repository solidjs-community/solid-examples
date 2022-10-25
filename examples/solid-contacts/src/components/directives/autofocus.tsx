import { onMount } from 'solid-js'

declare module 'solid-js' {
    namespace JSX {
        interface Directives {
            autofocus: boolean
        }
    }
}

/** This is intentionally designed as function call to prevent vite from messing with directive imports */
export function useAutoFocus() {
    return (el: HTMLElement) => {
        onMount(() => {
            el.focus()
        })
    }
}
