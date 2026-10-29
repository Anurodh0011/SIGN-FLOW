"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UploadModalProps {
  close: () => void;
  onSuccess?: () => void;
}

export function UploadModal({ close, onSuccess }: UploadModalProps) {
  const router = useRouter();
  const [hasFile, setHasFile] = useState(false);

  const handleContinue = () => {
    close();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/editor");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col">
        {/* Head */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Upload document</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add a document to prepare it for digital signing.
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
        <div className="p-6">
          {!hasFile ? (
            <button
              onClick={() => setHasFile(true)}
              className="w-full min-h-[200px] border-2 border-dashed border-purple-200 hover:border-primary-400 bg-purple-50/20 hover:bg-purple-50/40 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 text-primary-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <strong className="text-sm font-semibold text-slate-800">
                Drop your document here
              </strong>
              <p className="text-xs text-slate-500 mt-1">
                or <u className="text-primary-600 font-medium">browse files</u> from your computer
              </p>
              <small className="text-[10px] text-slate-400 mt-2">
                PDF, PNG or JPG · Max 25MB
              </small>
            </button>
          ) : (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-10 rounded-lg bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center shrink-0 border border-rose-200">
                    PDF
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Service Agreement.pdf
                    </p>
                    <p className="text-[10px] text-slate-400">2.4 MB · Uploaded</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary-600">100%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="w-full bg-primary-500 h-full rounded-full" />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                <Check className="h-3.5 w-3.5" />
                <span>File scanned and verified safe</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={close} className="text-xs text-slate-600">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleContinue}
            disabled={!hasFile}
            className="bg-primary-500 hover:bg-primary-600 text-white text-xs"
          >
            Continue to Editor
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
