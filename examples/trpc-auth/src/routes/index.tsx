import { Match, Show, Switch } from "solid-js";
import { Title, useNavigate } from "solid-start";
import toast from "solid-toast";
import { Spinner } from "~/components";
import { useAuth } from "~/storage";
import { eToString } from "~/utils/helpers";
import { TOAST_CONFIG } from "~/utils/scheme";
import { trpc } from "~/utils/trpc";

export default function Home() {
  const logout = trpc.user.logout.useMutation();
  const navigate = useNavigate();
  const auth = useAuth();

  const onLogout = async () => {
    if (!auth.data) return;
    try {
      await logout.mutateAsync();
      await auth.refetch();
      toast.success("Logged out successfully", TOAST_CONFIG);
      navigate("/auth/login");
    } catch (e) {
      toast.error(eToString(e), TOAST_CONFIG);
    }
  };

  return (
    <>
      <Title>Create JD App - Home</Title>
      <div class="grid place-items-center">
        <h1 class="font-bold text-2xl text-gray-500">Hello there</h1>
        <Switch
          fallback={
            <button
              onClick={() => navigate("/auth/login")}
              class="bg-blue rounded-lg p-2.5 text-white font-bold text-lg my-3"
            >
              Login
            </button>
          }
        >
          <Match when={auth.isLoading}>
            <Spinner />
          </Match>
          <Match when={auth.data}>
            <Show when={logout.isLoading}>
              <Spinner />
            </Show>
            <h3 class="text-lg font-bold text-gray-500">
              Welcome back {auth.data?.name}
            </h3>
            <button
              onClick={onLogout}
              class="bg-blue rounded-lg p-2.5 text-white font-bold text-lg my-3"
            >
              Logout
            </button>
          </Match>
        </Switch>
      </div>
    </>
  );
}
