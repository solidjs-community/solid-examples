import { ComponentProps, ParentProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { A, AnchorProps } from '@solidjs/router'

export default function Button(
    props: ParentProps<
        (AnchorProps | ComponentProps<'button'>) & {
            label: string
            primary?: boolean
            icon?: boolean
            loading?: boolean
            outline?: boolean
            href?: string
        }
    >
) {
    const color = () =>
        props.primary
            ? 'bg-primary hover:bg-opacity-75 active:bg-opacity-50'
            : 'hover:bg-surface-high active:bg-surface-higher'

    const [_, attributes] = splitProps(props, [
        'icon',
        'primary',
        'loading',
        'children',
        'outline',
    ])

    return (
        <Dynamic
            {...attributes}
            component={props.href ? A : 'button'}
            class={`inline-block disabled:animate-pulse rounded-full px-4 py-2 text-lg ${color()} ${
                props.class || ''
            }`}
            classList={{
                'border-2 dark:border-gray-600 border-gray-200': props.outline,
                'animate-pulse': props.loading,
                'inline-flex items-center justify-center !px-4 !py-4':
                    props.icon,
                ...(props.classList || {}),
            }}
            disabled={props.disabled || props.loading}
            aria-label={props.label}
        >
            {props.children}
        </Dynamic>
    )
}
