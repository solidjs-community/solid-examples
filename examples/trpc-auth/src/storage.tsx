import { createCookieSessionStorage } from "solid-start";
import client from "./env/client";
import { createContext, ParentComponent, useContext } from "solid-js";
import { trpc } from "./utils/trpc";
import { CreateQueryResult } from "@tanstack/solid-query";
import { IAppRouter } from "./server/trpc/router/_app";
import { inferProcedureOutput } from "@trpc/server";

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

type IAuthCTX = CreateQueryResult<
  inferProcedureOutput<IAppRouter["user"]["me"]>
>;

export const AuthContext = createContext<IAuthCTX>({} as IAuthCTX);

export const AuthProvider: ParentComponent = (props) => {
  const me = trpc.user.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return (
    <AuthContext.Provider value={me}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as IAuthCTX;
