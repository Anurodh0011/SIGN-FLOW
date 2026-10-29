export const APP_ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  DOCUMENTS: "/documents",
  SIGNATURES: "/signatures",
  EDITOR: "/editor",
  HELP: "/help-center",
  AUTH: "/auth/login",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
