"use client";

import React from "react";
import { PenTool, Edit2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SignatureArt from "@/components/elements/SignatureArt";
import { USER_SIGNATURE } from "@/constants/signatures.constants";
import { useApp } from "@/helpers/contexts/AppContextProvider";

export function SignaturesView() {
  const { openModal } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-primary-500 tracking-wider uppercase">
            Signature Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            My Digital Signature
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your single authenticated signature used across all contracts and
            documents.
          </p>
        </div>
        <Button
          onClick={() => openModal("clean")}
          className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm gap-2 self-start sm:self-auto"
        >
          <Edit2 className="h-4 w-4" />
          <span>Update signature</span>
        </Button>
      </div>

      {/* Signature Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col">
          <div className="h-56 relative bg-slate-50/70 border-b border-slate-100 flex items-center justify-center p-8">
            <Badge
              variant="success"
              className="absolute left-4 top-4 text-xs font-medium gap-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{USER_SIGNATURE.status}</span>
            </Badge>

            <div className="w-full flex items-center justify-center scale-125">
              <SignatureArt />
            </div>
          </div>

          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">
                  {USER_SIGNATURE.title}
                </h3>
                <span className="text-[11px] text-primary-600 bg-purple-50 font-medium px-2 py-0.5 rounded-full">
                  Primary
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {USER_SIGNATURE.date} · Ready for 1-click signing
              </p>
            </div>

            <Button
              onClick={() => openModal("clean")}
              variant="outline"
              size="sm"
              className="gap-2 text-xs border-slate-200 text-slate-700 hover:bg-slate-50 self-start sm:self-auto"
            >
              <PenTool className="h-3.5 w-3.5" />
              <span>Replace with new signature</span>
            </Button>
          </CardContent>
        </Card>

        {/* Verification & Security Info */}
        <div className="space-y-4">
          <Card className="border border-slate-200/80 shadow-sm bg-white p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Signature Details
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Account Owner</span>
                <span className="font-semibold text-slate-800">
                  Ajay Kuwnar
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Enforcement</span>
                <span className="font-semibold text-slate-800">
                  Single Signature
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Format</span>
                <span className="font-semibold text-slate-800">
                  Vector SVG / PNG
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Security</span>
                <span className="font-semibold text-emerald-600">
                  256-bit Encrypted
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignaturesView;
