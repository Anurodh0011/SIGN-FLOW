"use client";

import React, { type ReactNode } from "react";
import AppSidebar from "@/components/common/Sidebar/AppSidebar";
import AppHeader from "@/components/common/Header/AppHeader";
import UploadModal from "@/components/elements/UploadModal";
import CleanModal from "@/components/elements/CleanModal";
import AuthModal from "@/components/elements/AuthModal";
import Toast from "@/components/ui/Toast";
import { useSidebar } from "@/hooks/use-sidebar";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: ReactNode;
}

export function Base({ children }: BaseProps) {
  const sidebar = useSidebar();
  const { modal, closeModal, toastMessage, closeToast } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <AppSidebar isOpen={sidebar.isOpen} onClose={sidebar.close} />

      <div
        className={cn(
          "transition-[margin-left] ease-in-out duration-300 relative",
          sidebar.isOpen ? "lg:ml-64" : "lg:ml-64"
        )}
      >
        <AppHeader onMenuToggle={sidebar.toggle} />
        <main className="bg-slate-50 min-h-[calc(100vh-4rem)] pt-6 pb-16">
          <div className="px-4 sm:px-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {modal === "upload" && <UploadModal close={closeModal} />}
      {modal === "clean" && <CleanModal close={closeModal} />}
      {modal === "auth" && <AuthModal close={closeModal} />}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </div>
  );
}

export default Base;
