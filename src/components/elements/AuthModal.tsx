"use client";

import React, { useState } from "react";
import { Lock, Check, Eye, ArrowRight, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../common/Logo";
import SignatureArt from "./SignatureArt";
import { useAuth } from "@/helpers/contexts/AuthContextProvider";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { cn } from "@/lib/utils";

export interface AuthModalProps {
  close: () => void;
}

export function AuthModal({ close }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const { notify } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgot) {
      notify("Password reset link sent to your email");
      setForgot(false);
    } else {
      login(email || "ajay.kunwar@northstar.io");
      notify(
        mode === "signin"
          ? "Signed in successfully"
          : "Account created successfully",
      );
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 my-auto">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Brand Panel */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
          <div className="z-10">
            <Logo href="/dashboard" />
          </div>

          {/* Visual Paper Simulation */}
          <div className="my-8 flex justify-center items-center relative z-10">
            <div className="w-56 h-64 rounded-xl bg-white p-5 shadow-2xl -rotate-3 text-slate-800 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2">
                <div className="h-2 bg-slate-200 rounded-full w-24" />
                <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                <div className="h-1.5 bg-slate-100 rounded-full w-5/6" />
                <div className="h-1.5 bg-slate-100 rounded-full w-4/6" />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="w-full flex items-center justify-center">
                  <SignatureArt />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold mt-2">
                  <Check className="h-3 w-3" />
                  <span>Signature verified</span>
                </div>
              </div>
            </div>

            {/* Float chips */}
            <div className="absolute -left-2 top-8 px-3 py-1.5 bg-white text-slate-800 text-[10px] font-bold rounded-lg shadow-lg flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-primary-500" />
              <span>Bank-level security</span>
            </div>
            <div className="absolute -right-2 bottom-8 px-3 py-1.5 bg-white text-slate-800 text-[10px] font-bold rounded-lg shadow-lg flex items-center gap-1.5">
              <Check className="h-3 w-3 text-emerald-500" />
              <span>Signed in seconds</span>
            </div>
          </div>

          <div className="z-10">
            <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
              Documents signed.
              <br />
              Work moving forward.
            </h3>
            <p className="text-xs text-purple-200/80 mt-2 leading-relaxed">
              Create, place, and manage secure digital signatures from one
              workspace.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          {forgot ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-sm mx-auto w-full"
            >
              <button
                type="button"
                onClick={() => setForgot(false)}
                className="text-xs text-primary-500 hover:text-primary-600 font-semibold flex items-center gap-1.5 mb-2 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to sign in</span>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Reset your password
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your email and we’ll send you a secure reset link.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Work email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="ajay.kunwar@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs bg-slate-50 border-slate-200"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white text-xs py-2.5 shadow-sm"
              >
                Send reset link
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-sm mx-auto w-full"
            >
              {/* Mode Tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={cn(
                    "py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                    mode === "signin"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800",
                  )}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={cn(
                    "py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                    mode === "signup"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800",
                  )}
                >
                  Create account
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {mode === "signin" ? "Welcome back" : "Create your workspace"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === "signin"
                    ? "Sign in to continue to your SignFlow workspace."
                    : "Start signing documents in just a few minutes."}
                </p>
              </div>

              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Full name
                  </label>
                  <Input
                    required
                    placeholder="Ajay Kuwnar"
                    className="text-xs bg-slate-50 border-slate-200"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Work email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="ajay.kunwar@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="text-xs bg-slate-50 border-slate-200 pr-10"
                  />
                  <Eye className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-primary-500 rounded"
                  />
                  <span>Remember me</span>
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => setForgot(true)}
                    className="text-primary-600 hover:underline font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white text-xs py-2.5 shadow-sm gap-2"
              >
                <span>
                  {mode === "signin" ? "Sign in to SignFlow" : "Create account"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative px-3 bg-white text-[10px] text-slate-400 uppercase tracking-wider">
                  or continue with
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full text-xs py-2 border-slate-200 text-slate-700 hover:bg-slate-50 gap-2"
                onClick={() => {
                  login("google.user@northstar.io");
                  notify("Signed in with Google");
                  close();
                }}
              >
                <span className="font-bold text-blue-500">G</span>
                <span>Google</span>
              </Button>

              <p className="text-[10px] text-slate-400 text-center mt-3">
                By continuing, you agree to our <u>Terms</u> and{" "}
                <u>Privacy Policy</u>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
