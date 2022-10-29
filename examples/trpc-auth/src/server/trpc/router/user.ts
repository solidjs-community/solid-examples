import { procedure, protectedProcedure, router } from "../utils";
import bcrypt from "bcryptjs";
import { loginScheme, registerScheme } from "~/utils/scheme";
import { TRPCError } from "@trpc/server";
import { storage } from "~/storage";

export default router({
  register: procedure.input(registerScheme).mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: await bcrypt.hash(input.password, 10),
          name: input.username,
        },
      });
    } catch (e: any) {
      if ("code" in e && e.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }
      throw e;
    }
  }),
  login: procedure.input(loginScheme).mutation(async ({ ctx, input }) => {
    const acc = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!acc) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    if (!(await bcrypt.compare(input.password, acc.password))) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect password",
      });
    }
    delete (acc as Partial<typeof acc>)?.password;
    const session = await storage.getSession();
    session.set("acc", acc);
    ctx.res.headers["Set-Cookie"] = await storage.commitSession(session);
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const session = await storage.getSession(ctx.req.headers.get("Cookie"));
    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No session found",
      });
    }
    ctx.res.headers["Set-Cookie"] = await storage.destroySession(session);
  }),
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user ?? null;
  }),
});
