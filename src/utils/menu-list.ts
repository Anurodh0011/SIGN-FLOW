import { MAIN_NAVIGATION, type NavItem } from "@/constants/navigation.constants";

export interface Group {
  groupLabel: string;
  menus: NavItem[];
}

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "WORKSPACE",
      menus: MAIN_NAVIGATION,
    },
  ];
}
