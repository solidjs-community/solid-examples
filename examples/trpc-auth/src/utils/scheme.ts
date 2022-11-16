import { z, ZodFormattedError, ZodObject, ZodRawShape } from "zod";
import { toast } from "solid-toast";

export const registerScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(2),
});

export const loginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        }: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

export const TOAST_CONFIG: Parameters<typeof toast["error"]>[1] = {
  position: "top-center",
  style: {
    "font-weight": "bold",
  },
};

export const validateScheme = <F extends ZodRawShape, Zod extends ZodObject<F>>(
  scheme: Zod,
  props: Zod["_input"]
) => {
  const results = scheme.safeParse(props);
  if (!results.success) {
    const err = formatErrors(results.error.format()).filter(
      (e) => e !== undefined
    );
    toast.error(err[0] ?? "Something went wrong", TOAST_CONFIG);
    return false;
  }
  return true;
};
