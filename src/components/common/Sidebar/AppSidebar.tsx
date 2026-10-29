"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenTool,
  HelpCircle,
  Sparkles,
  LogOut,
  X,
} from "lucide-react";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/helpers/contexts/AuthContextProvider";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { cn } from "@/lib/utils";

export interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  { id: "documents", label: "Documents", icon: FileText, href: "/documents" },
  {
    id: "signatures",
    label: "My Signature",
    icon: PenTool,
    href: "/signatures",
  },
  { id: "help", label: "Help Center", icon: HelpCircle, href: "/help-center" },
];

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { notify } = useApp();

  const handleLogout = () => {
    logout();
    notify("Logged out successfully");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Aside */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200/80 transition-transform duration-300 ease-in-out flex flex-col justify-between p-4",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col">
          {/* Header & Logo */}
          <div className="flex items-center justify-between px-2 pt-2 pb-6">
            <Logo />
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              Workspace
            </p>
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-purple-50 text-primary-500 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  )}
                >
                  <IconComp
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-primary-500"
                        : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Promo & User Profile */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          {/* User Profile */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-primary-600 font-semibold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                {user?.initials || "AM"}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {user?.name}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AppSidebar;
