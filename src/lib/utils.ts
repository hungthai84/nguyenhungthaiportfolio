export function cn(...classes: (string | boolean | undefined | null | Record<string, any>)[]) {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === "string") return c;
      if (typeof c === "object" && c !== null) {
        return Object.entries(c)
          .filter(([_, v]) => Boolean(v))
          .map(([k]) => k)
          .join(" ");
      }
      return "";
    })
    .join(" ")
    .trim();
}
