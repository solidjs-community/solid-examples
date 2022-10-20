import { Show, VoidProps } from 'solid-js'
import { Input } from '~/components/Input'
import { IContact } from '~/server/database/entities/contact'
import { createRouteAction, FormError } from 'solid-start/data'
import { useContactsStore } from '~/client/stores/contacts'
import { contactsApi } from '~/server/api/contacts'
import { useNavigate } from '@solidjs/router'
import { isServer } from 'solid-js/web'
import Button from '~/components/Button'
import ChevronLeftIcon from '~/components/icons/ChevronLeftIcon'
import Avatar from '~/components/Avatar'
import { useFlipAnimation } from '~/components/directives/flip'
import EnvelopeIcon from '~/components/icons/EnvelopeIcon'
import UserIcon from '~/components/icons/UserIcon'
import PhoneIcon from '~/components/icons/PhoneIcon'

export function ContactForm(props: VoidProps<{ contact?: IContact }>) {
    const [formState, { Form }] = props.contact
        ? editContact(props.contact.id)
        : createContact()

    const navigate = useNavigate()
    const flip = useFlipAnimation('ContactForm')
    const error = () =>
        formState.error ? (formState.error as FormError) : undefined

    const name = () =>
        (formState.input?.get('name') as string) || props.contact?.name

    function handleCancelClick() {
        return (e: MouseEvent) => {
            e.preventDefault()
            navigate(-1)
        }
    }

    return (
        <div class="p-2 animate-appear">
            <h1 class="sr-only">Edit Contact</h1>
            <div class="h-12 sticky top-0 bg-background">
                <Button
                    label="Navigate Back"
                    onClick={() => navigate(-1)}
                    classList={{ invisible: isServer }}
                    icon
                >
                    <ChevronLeftIcon class="w-6 h-6" />
                </Button>
            </div>
            <div class="flex items-center justify-center pb-8">
                <Avatar
                    text={name() ? name()[0] : '?'}
                    colorCode={name() ? name()[name().length - 2] : undefined}
                    size="medium"
                    ref={(el) =>
                        flip(el, () => `contact${props.contact?.id}.avatar`)
                    }
                ></Avatar>
            </div>
            <Form>
                <Show when={props.contact}>
                    <input
                        type="hidden"
                        name="contactId"
                        value={props.contact.id}
                    />
                </Show>
                <div class="space-y-6">
                    <div>
                        <Input
                            name="name"
                            label="Name"
                            error={error()}
                            value={props.contact?.name}
                            icon={<UserIcon />}
                        ></Input>
                        <Input
                            name="phone"
                            label="Phone Number"
                            error={error()}
                            value={props.contact?.phone}
                            icon={<PhoneIcon />}
                        ></Input>
                        <Input
                            name="email"
                            label="Email"
                            error={error()}
                            value={props.contact?.email}
                            icon={<EnvelopeIcon />}
                        ></Input>
                    </div>
                    <Show when={error() && !error().fieldErrors}>
                        <span class="block text-red-500">
                            {error().message}
                        </span>
                    </Show>
                    <div class="flex items-center justify-center space-x-6">
                        <Button
                            label="Save Contact"
                            type="submit"
                            primary
                            disabled={formState.pending}
                        >
                            {formState.pending
                                ? 'Saving'
                                : props.contact
                                ? 'Save Contact'
                                : 'Create Contact'}
                        </Button>
                        <Button
                            label="Cancel"
                            onClick={handleCancelClick()}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

function createContact() {
    return createRouteAction(contactsApi.createContact)
}

function editContact(contactId: string) {
    return createRouteAction(contactsApi.editContact, {
        invalidate: () => {
            useContactsStore()?.removeContact(contactId)
        },
    })
}
