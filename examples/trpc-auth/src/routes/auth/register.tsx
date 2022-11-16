import { createSignal, ParentComponent, Show  } from "solid-js";
import { A, Title, useNavigate } from "solid-start";
import { toast } from "solid-toast";
import { eToString } from "~/utils/helpers";
import { registerScheme, TOAST_CONFIG, validateScheme } from "~/utils/scheme";
import { trpc } from "~/utils/trpc";
import { Spinner } from "~/components";

interface IRegisterProps {}

const Register: ParentComponent<IRegisterProps> = ({}) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [username, setUsername] = createSignal("");
  const navigate = useNavigate();
  const register = trpc.user.register.useMutation();

  const onHandleRegister = async () => {
    if (
      validateScheme(registerScheme, {
        email: email(),
        password: password(),
        username: username(),
      })
    ) {
      try {
        await register.mutateAsync({
          email: email(),
          password: password(),
          username: username(),
        });
        toast.success("Registered successfully", TOAST_CONFIG);
        navigate("/auth/login");
      } catch (e) {
        toast.error(eToString(e), TOAST_CONFIG);
      }
    }
  };

  return (
    <>
      <Title>Create JD App - Register</Title>
      <div class="flex flex-col items-center gap-1 animate-fade-in">
        <h1 class="text-blue text-2xl font-semibold">Register</h1>
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
        <div class="flex flex-col gap-1">
          <label class="text-textish font-Nunito">Username</label>
          <input
            value={username()}
            class="bg-grayish caret-blue font-bold text-blackish placeholder:text-xs rounded-lg p-2.5 h-[2.5rem] font-Nunito focus:outline-none transition-transform hover:scale-[1.01]"
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="e.g myName"
            type="text"
          />
        </div>
        <button
          onClick={onHandleRegister}
          class="bg-blue text-white rounded-lg px-5 py-2 font-bold text-lg my-2"
        >
          Submit
        </button>
        <A href="/auth/login" class="text-blue font-bold">
          Already have an account? Login
        </A>
        <Show when={register.isLoading}>
          <Spinner />
        </Show>
      </div>
    </>
  );
};

export default Register;
