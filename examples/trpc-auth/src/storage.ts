import { createCookieSessionStorage } from "solid-start";
import client from "./env/client";

export const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secrets: [client.VITE_SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});
