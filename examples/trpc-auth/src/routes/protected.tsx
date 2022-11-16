import { ParentComponent } from "solid-js";
import { Title, redirect } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { storage } from "~/storage";

interface IProtectedProps {}

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

const Protected: ParentComponent<IProtectedProps> = ({}) => {
  return (
    <>
      <Title>Protected</Title>
      <div class="grid place-items-center">This is a protected route</div>
    </>
  );
};

export default Protected;
