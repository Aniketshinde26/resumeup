export const formatSocialUrl = (url?: string): string =>
  url
    ? url
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .replace(/\/$/, "")
    : "";
