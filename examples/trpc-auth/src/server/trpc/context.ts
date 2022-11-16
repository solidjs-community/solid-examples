import { User } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { createSolidAPIHandlerContext } from "solid-start-trpc";
import { prisma } from "~/server/db/client";

export const createContextInner = async (
  opts: createSolidAPIHandlerContext
) => {
  return {
    prisma,
    ...opts,
  } as {
    prisma: typeof prisma;
    user?: Omit<User, "password">;
  } & createSolidAPIHandlerContext;
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
