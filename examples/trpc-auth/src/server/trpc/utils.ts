import { initTRPC } from "@trpc/server";
import { IContext } from "./context";
import { storage } from "~/storage";
import { User } from "@prisma/client";

export const t = initTRPC.context<IContext>().create();

export const router = t.router;
export const procedure = t.procedure;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const cookie = ctx.req.headers.get("Cookie") ?? "";
  const session = await storage.getSession(cookie);
  const info: Omit<User, "password"> = session.get("acc");
  if (info) {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: info.email,
        },
      });
      if (user) {
        delete (user as Partial<typeof user>)?.password;
        ctx.user = user;
      }
    } catch {}
  }
  return next({ ctx });
});

export const protectedProcedure = t.procedure.use(isAuthed);
