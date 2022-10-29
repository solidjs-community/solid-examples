export const eToString = (e: any): string => {
  if (typeof e === "string") return e;
  else if (typeof e === "object") {
    if ("code" in e && "message" in e) {
      `${e.code}: ${e.message}`;
    } else if ("message" in e) {
      return eToString(e.message);
    } else if ("stack" in e) {
      return eToString(e.stack);
    }
  } else if (typeof e === "number") {
    return e.toString();
  }
  return "Something went wrong";
};
