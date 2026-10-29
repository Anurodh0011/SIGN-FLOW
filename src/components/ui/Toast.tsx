"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";

export interface ToastProps {
  message: string;
  onClose?: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white border border-emerald-200 rounded-2xl shadow-xl animate-in slide-in-from-bottom-4 duration-200 max-w-sm w-full">
      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <strong className="text-xs font-semibold text-slate-900 block">Success</strong>
        <p className="text-xs text-slate-500 truncate">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default Toast;
