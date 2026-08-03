export const checkRole = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;

export type ROLE = "contributor" | "maintainer";
