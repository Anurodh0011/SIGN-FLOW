"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/elements/AuthModal";

export function AuthView() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <AuthModal close={() => router.push("/dashboard")} />
    </div>
  );
}

export default AuthView;
