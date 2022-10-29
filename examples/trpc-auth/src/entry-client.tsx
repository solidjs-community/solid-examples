import { mount, StartClient } from "solid-start/entry-client";
import { TRPCProvider } from "solid-trpc";
import { AuthProvider } from "./storage";
import { client, queryClient } from "./utils/trpc";

mount(
  () => (
    <TRPCProvider client={client} queryClient={queryClient}>
      <AuthProvider>
        <StartClient />
      </AuthProvider>
    </TRPCProvider>
  ),
  document
);
