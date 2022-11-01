import { mount, StartClient } from "solid-start/entry-client";
import { AuthProvider } from "./storage";
import { client, queryClient, trpc } from "./utils/trpc";

mount(
  () => (
    <trpc.Provider client={client} queryClient={queryClient}>
      <AuthProvider>
        <StartClient />
      </AuthProvider>
    </trpc.Provider>
  ),
  document
);
