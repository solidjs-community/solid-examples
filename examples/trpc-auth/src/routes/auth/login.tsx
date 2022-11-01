import { createSignal, ParentComponent, Show } from "solid-js";
import { A, Title, useNavigate } from "solid-start";
import { toast } from "solid-toast";
import { Spinner } from "~/components";
import { eToString } from "~/utils/helpers";
import { loginScheme, TOAST_CONFIG, validateScheme } from "~/utils/scheme";
import { trpc } from "~/utils/trpc";

interface ILoginProps {}

const Login: ParentComponent<ILoginProps> = ({}) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const context = trpc.useContext();
  const navigate = useNavigate();
  const login = trpc.user.login.useMutation({
    onSuccess: async () => {
      await context.user.me.invalidate();
    },
  });

  const onHandleLogin = async () => {
    if (validateScheme(loginScheme, { email: email(), password: password() })) {
      try {
        await login.mutateAsync({
          email: email(),
          password: password(),
        });
        toast.success("Logged in successfully", TOAST_CONFIG);
        navigate("/");
      } catch (e) {
        toast.error(eToString(e), TOAST_CONFIG);
      }
    }
  };

  return (
    <>
      <Title>Create JD App - Login</Title>
      <div class="flex flex-col items-center gap-1 animate-fade-in">
        <h1 class="text-blue text-2xl font-semibold">Login</h1>
        <div class="flex flex-col gap-1">
          <label class="text-textish font-Nunito">Email</label>
          <input
            value={email()}
            class="bg-grayish caret-blue font-bold text-blackish placeholder:text-xs rounded-lg p-2.5 h-[2.5rem] font-Nunito focus:outline-none transition-transform hover:scale-[1.01]"
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="e.g myname@company.com"
            type="email"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-textish font-Nunito">Password</label>
          <input
            value={password()}
            class="bg-grayish caret-blue font-bold text-blackish placeholder:text-xs rounded-lg p-2.5 h-[2.5rem] font-Nunito focus:outline-none transition-transform hover:scale-[1.01]"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="e.g 12345678"
            type="password"
          />
        </div>
        <button
          onClick={onHandleLogin}
          class="bg-blue text-white rounded-lg px-5 py-2 font-bold text-lg my-2"
        >
          Submit
        </button>
        <A href="/auth/register" class="text-blue font-bold">
          Don't have an account? Register
        </A>
        <Show when={login.isLoading}>
          <Spinner />
        </Show>
      </div>
    </>
  );
};

export default Login;
