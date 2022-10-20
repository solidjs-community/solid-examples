import { createMemo, JSX, VoidProps } from 'solid-js'

export default function Avatar(
    props: VoidProps<{
        text?: string
        colorCode?: string
        size?: 'medium' | 'large' | 'small'
        ref?: (element: HTMLElement) => void
        onClick?: JSX.EventHandler<HTMLElement, MouseEvent>
    }>
) {
    const size = createMemo(() => {
        switch (props.size || 'small') {
            case 'small':
                return 'w-[36px] h-[36px] text-xl'
            case 'medium':
                return 'w-16 h-16 text-2xl'
            case 'large':
                return 'w-20 h-20 text-3xl'
        }
    })

    const color = createMemo(() => {
        let colorCode = (props.colorCode || '').toLowerCase()
        return colorsMap[colorCode] || colorsMap.default
    })

    return (
        <span
            onClick={props.onClick}
            ref={props.ref}
            class={`${size()} ${color()} dark:text-gray-800 rounded-full flex-shrink flex items-center justify-center bg-gray-100 font-medium uppercase`}
        >
            {props.text}
        </span>
    )
}

const colorsMap = {
    a: 'bg-red-100 dark:bg-red-300',
    b: 'bg-sky-100 dark:bg-sky-300',
    c: 'bg-teal-100 dark:bg-teal-300',
    d: 'bg-rose-100 dark:bg-rose-300',
    e: 'bg-amber-100 dark:bg-amber-300',
    f: 'bg-lime-100 dark:bg-lime-300',
    g: 'bg-green-100 dark:bg-green-300',
    h: 'bg-yellow-100 dark:bg-yellow-300',
    i: 'bg-orange-100 dark:bg-orange-300',
    j: 'bg-emerald-100 dark:bg-emerald-300',
    k: 'bg-indigo-100 dark:bg-indigo-300',
    l: 'bg-cyan-100 dark:bg-cyan-300',
    m: 'bg-pink-100 dark:bg-pink-300',
    n: 'bg-fuchsia-100 dark:bg-fuchsia-300',
    o: 'bg-violet-100 dark:bg-violet-300',
    p: 'bg-purple-100 dark:bg-purple-300',
    q: 'bg-blue-100 dark:bg-blue-300',
    r: 'bg-red-100 dark:bg-red-300',
    s: 'bg-sky-100 dark:bg-sky-300',
    t: 'bg-teal-100 dark:bg-teal-300',
    u: 'bg-rose-100 dark:bg-rose-300',
    v: 'bg-amber-100 dark:bg-amber-300',
    x: 'bg-lime-100 dark:bg-lime-300',
    y: 'bg-green-100 dark:bg-green-300',
    w: 'bg-yellow-100 dark:bg-yellow-300',
    z: 'bg-orange-100 dark:bg-orange-300',
    default: 'bg-rose-100 dark:bg-rose-300',
}
