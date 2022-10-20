import { Accessor, onCleanup, onMount } from 'solid-js'

declare module 'solid-js' {
    namespace JSX {
        interface Directives {
            flip: FlipAnimationOptions | string
        }
    }
}

interface FlipElement {
    componentId: string
    ref?: HTMLElement
    position?: DOMRect
}
export interface FlipAnimationOptions {
    namespace: string
    duration?: number
}

const flipStacks = new Map<string, FlipElement[]>()

export function useFlipAnimation(componentId: string) {
    return (
        elementRef: HTMLElement,
        value: Accessor<FlipAnimationOptions | string>
    ) => {
        const currentElementRef = elementRef
        const currentElement: FlipElement = {
            componentId: componentId,
        }

        const [namespace, options] = (() => {
            const actualValue = value()
            return [
                typeof actualValue === 'string'
                    ? actualValue
                    : actualValue.namespace,
                typeof actualValue === 'object' ? actualValue : undefined,
            ]
        })()

        onMount(() => {
            // we need to hold until the next frame so the browser has the
            // opportunity to restore the scroll position on popstate-triggered navigation
            nextFrame(() => {
                let stack = flipStacks.get(namespace)

                if (!stack) {
                    stack = [] as FlipElement[]
                    flipStacks.set(namespace, stack)
                }

                currentElement.ref = currentElementRef
                stack.push(currentElement)

                const previousElement = stack[stack.indexOf(currentElement) - 1]

                if (
                    previousElement &&
                    previousElement.componentId !== currentElement.componentId
                ) {
                    const previousElementPosition =
                        previousElement.ref?.getBoundingClientRect() ||
                        previousElement.position

                    if (previousElementPosition) {
                        playFlipAnimation(
                            currentElementRef,
                            previousElementPosition,
                            options
                        )
                    }

                    if (!previousElement.ref) {
                        stack.splice(stack.indexOf(previousElement), 1)
                    }
                }
            })
        })

        onCleanup(() => {
            const stack = flipStacks.get(namespace)
            if (!stack) return

            currentElement.ref = undefined
            currentElement.position = currentElementRef?.getBoundingClientRect()

            const previousElement = stack[stack.length - 2]

            if (
                previousElement &&
                previousElement.ref &&
                currentElement.position &&
                currentElement.componentId !== previousElement.componentId
            ) {
                playFlipAnimation(
                    previousElement.ref,
                    currentElement.position,
                    options
                )
            }
        })
    }
}

function nextFrame(fn: () => void) {
    requestAnimationFrame(() => {
        requestAnimationFrame(fn)
    })
}

function playFlipAnimation(
    element: HTMLElement | undefined,
    source: DOMRect,
    options?: FlipAnimationOptions
) {
    const destination = element!.getBoundingClientRect()

    const deltaX = source.left - destination.left
    const deltaY = source.top - destination.top
    const deltaW = source.width / destination.width
    const deltaH = source.height / destination.height

    element!.animate(
        [
            {
                transformOrigin: 'top left',
                transform: `
      translate(${deltaX}px, ${deltaY}px)
      scale(${deltaW}, ${deltaH})
    `,
            },
            {
                transformOrigin: 'top left',
                transform: 'none',
            },
        ],
        {
            duration: options?.duration || 250,
            easing: 'ease-in-out',
            fill: 'both',
        }
    )
}
