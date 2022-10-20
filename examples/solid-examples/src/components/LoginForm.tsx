import { Input } from '~/components/Input'
import { createRouteAction, FormError } from 'solid-start/data'
import { authApi } from '~/server/api/auth'
import { useUserStore } from '~/client/stores/user'
import { useContactsStore } from '~/client/stores/contacts'
import { useSearchParams } from '@solidjs/router'
import Button from '~/components/Button'
import SolidLogo from '~/components/icons/SolidLogo'
import UserIcon from '~/components/icons/UserIcon'

export default function LoginForm() {
    const [loginState, { Form }] = login()
    const [params] = useSearchParams()

    return (
        <main class="flex items-center justify-center h-screen">
            <div class="w-96 space-y-4">
                <div class="flex justify-center">
                    <SolidLogo class="w-20 h-20 bg-surface rounded-full p-2"></SolidLogo>
                </div>
                <Form class=" bg-surface p-6 rounded-3xl">
                    <h1 class="pb-8 text-2xl text-center">Login</h1>
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={params.redirectTo ?? '/'}
                    />
                    <Input
                        name="username"
                        label="User"
                        autofocus
                        placeholder="What is your name?"
                        error={loginState.error as FormError}
                        icon={<UserIcon />}
                    ></Input>
                    <Button
                        label="Continue"
                        primary
                        loading={loginState.pending}
                        disabled={loginState.pending}
                        class="w-full"
                    >
                        Continue
                    </Button>
                </Form>
            </div>
        </main>
    )
}

function login() {
    return createRouteAction(authApi.login, {
        invalidate: () => {
            useUserStore().reset()
            useContactsStore().reset()
        },
    })
}
