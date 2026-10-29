export interface NavItem {
  id: string;
  label: string;
  icon: "grid" | "file" | "pen" | "help" | "settings";
  href: string;
}

export const MAIN_NAVIGATION: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid", href: "/dashboard" },
  { id: "documents", label: "Documents", icon: "file", href: "/documents" },
  { id: "signatures", label: "My Signature", icon: "pen", href: "/signatures" },
  { id: "help", label: "Help Center", icon: "help", href: "/help-center" },
];

export const CURRENT_USER = {
  name: "Ajay Kunwar",
  initials: "AM",
  email: "ajay.kunwar@company.com",
};
