import { Show } from "solid-js";
import { Title, useNavigate } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import toast from "solid-toast";
import { Spinner } from "~/components";
import { storage } from "~/storage";
import { eToString } from "~/utils/helpers";
import { TOAST_CONFIG } from "~/utils/scheme";
import { trpc } from "~/utils/trpc";

// Protected route

export function routeData() {
  return createServerData$(async (_, event) => {
    const session = await storage.getSession(
      event.request.headers.get("Cookie")
    );
    const acc = session.get("acc");
    if (!acc) {
      throw redirect("/auth/login");
    }
    return acc;
  });
}

export default function Home() {
  const logout = trpc.user.logout.useMutation();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout.mutateAsync();
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
        <Show when={logout.isLoading}>
          <Spinner />
        </Show>
        <button
          onClick={onLogout}
          class="bg-blue rounded-lg p-2.5 text-white font-bold text-lg my-3"
        >
          Logout
        </button>
      </div>
    </>
  );
}
