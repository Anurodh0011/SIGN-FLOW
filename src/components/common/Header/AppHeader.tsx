"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Upload, Menu as MenuIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { useAuth } from "@/helpers/contexts/AuthContextProvider";
import { MAIN_NAVIGATION } from "@/constants/navigation.constants";

export interface AppHeaderProps {
  onMenuToggle?: () => void;
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  const pathname = usePathname();
  const { openModal } = useApp();
  const { user } = useAuth();

  const currentNav = MAIN_NAVIGATION.find((n) => pathname.startsWith(n.href));
  const pageTitle = currentNav
    ? currentNav.label
    : pathname.includes("editor")
      ? "Document Editor"
      : "Workspace";

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-500">SignFlow</span>
          <span>/</span>
          <strong className="text-slate-800 font-semibold">{pageTitle}</strong>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="bg-primary-500 hover:bg-primary-600 text-white gap-1.5 shadow-sm"
          onClick={() => openModal("upload")}
        >
          <Upload className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Upload</span>
        </Button>

        <button
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
          onClick={() => {}}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <button
          onClick={() => openModal("auth")}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-primary-500 font-semibold text-xs border border-purple-200 hover:ring-2 hover:ring-primary-500/20 transition-all cursor-pointer"
          aria-label="User profile"
        >
          {user?.initials || "AM"}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
