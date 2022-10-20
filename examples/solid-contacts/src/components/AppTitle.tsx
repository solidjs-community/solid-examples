import { VoidProps } from 'solid-js'
import { Title } from 'solid-start'

export default function AppTitle(props: { title?: string }) {
    const fullTitle = () =>
        props.title ? `${props.title} - Solid Contacts` : 'Solid Contacts'

    return <Title>{fullTitle()}</Title>
}
