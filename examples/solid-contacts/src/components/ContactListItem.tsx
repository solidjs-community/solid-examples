import { JSX, VoidProps } from 'solid-js'
import Avatar from '~/components/Avatar'
import { useFlipAnimation } from '~/components/directives/flip'
import { Link } from '@solidjs/router'
import { IContact } from '~/server/database/entities/contact'
import { Dynamic } from 'solid-js/web'

export default function (
    props: VoidProps<{
        contact: IContact
        roundTop?: boolean
        roundBottom?: boolean
        onAvatarClick?: JSX.EventHandler<HTMLElement, MouseEvent>
        onClick?: JSX.EventHandler<HTMLElement, MouseEvent>
        prependSlot?: JSX.Element
        noLink?: boolean
    }>
) {
    const flip = useFlipAnimation('ContactListItem')

    return (
        <Dynamic
            component={props.noLink ? 'div' : Link}
            tabIndex="0"
            onClick={props.onClick}
            href={`/contacts/${props.contact.id}`}
            class="flex cursor-pointer items-center space-x-4 bg-surface hover:bg-surface-high transition-colors active:bg-surface-higher h-14 px-6 [&:has(input[type=checkbox]:checked)]:bg-surface-high"
            classList={{
                'rounded-t-3xl': props.roundTop,
                'rounded-b-3xl': props.roundBottom,
            }}
        >
            {props.prependSlot}
            <Avatar
                text={props.contact.name[0]}
                colorCode={props.contact.name[props.contact.name.length - 2]}
                onClick={props.onAvatarClick}
                ref={(el) =>
                    flip(el, () => `contact${props.contact.id}.avatar`)
                }
            ></Avatar>
            <span
                class="inline-block text-on-surface"
                use:flip={`contact${props.contact.id}.name`}
            >
                {props.contact.name}
            </span>
        </Dynamic>
    )
}
