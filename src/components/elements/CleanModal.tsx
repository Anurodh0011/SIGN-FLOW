"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SignatureArt from "./SignatureArt";
import { useApp } from "@/helpers/contexts/AppContextProvider";

export interface CleanModalProps {
  close: () => void;
}

export function CleanModal({ close }: CleanModalProps) {
  const [threshold, setThreshold] = useState(68);
  const { notify } = useApp();

  const handleSave = () => {
    close();
    notify("Signature updated successfully");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col">
        {/* Head */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <Badge variant="info" className="mb-1 text-[10px] gap-1">
              <Sparkles className="h-3 w-3" />
              <span>AUTO-CLEAN</span>
            </Badge>
            <h2 className="text-base font-bold text-slate-900">Remove white background</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fine-tune transparency before updating your signature.
            </p>
          </div>
          <button
            onClick={close}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Original Image
              </label>
              <div className="h-40 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-6">
                <SignatureArt />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Auto-Cleaned Preview
              </label>
              <div className="h-40 rounded-xl border border-slate-200 checkerboard-pattern flex items-center justify-center p-6 shadow-inner">
                <SignatureArt />
              </div>
            </div>
          </div>

          {/* Threshold Slider */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-700">Background threshold</label>
              <strong className="font-bold text-primary-600">{threshold}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(+e.target.value)}
              className="w-full accent-primary-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
            <p className="text-[10px] text-slate-400">
              Increase to remove more light pixels around the signature edges.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={close} className="text-xs text-slate-600">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-primary-500 hover:bg-primary-600 text-white text-xs gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Save signature</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CleanModal;
