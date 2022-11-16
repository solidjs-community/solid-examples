import { router } from "../utils";
import user from "./user";

export const appRouter = router({
  user,
});

export type IAppRouter = typeof appRouter;
