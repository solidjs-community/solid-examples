import { ComponentProps, createMemo, JSX, Show, VoidProps } from 'solid-js'
import { FormError } from 'solid-start/data'

export function Input(
    props: VoidProps<
        {
            name: string
            label: string
            error?: FormError
            icon?: JSX.Element
        } & ComponentProps<'input'>
    >
) {
    const id = `${props.name}.${new Date().getTime()}`
    const errorMessage = createMemo(() => {
        return props.error?.fieldErrors?.[props.name]
    })

    return (
        <div class="relative">
            <Show when={props.icon}>
                <div class="text-primary absolute flex items-center justify-center left-0 top-0 h-14 pl-6">
                    {props.icon}
                </div>
            </Show>
            <label
                class="sr-only"
                for={id}
            >
                {props.label}
            </label>
            <input
                id={id}
                {...props}
                placeholder={props.placeholder || props.label}
                class={`bg-surface-high rounded-full h-14 px-6 w-full ${props.class}`}
                classList={{ 'pl-16': !!props.icon }}
                value={props.value || ''}
            />
            <div class="h-10 pl-6">
                <Show when={errorMessage()}>
                    <span class="text-xs text-error">{errorMessage()}</span>
                </Show>
            </div>
        </div>
    )
}
