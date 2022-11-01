import solid from "solid-start/vite";
import { defineConfig } from "vite";
// @ts-ignore
import vercel from "solid-start-vercel";

export default defineConfig({
  plugins: [solid({ ssr: false, adapter: vercel({ edge: false }) })],
});
