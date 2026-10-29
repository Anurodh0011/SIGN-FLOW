"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Undo2,
  Redo2,
  Lock,
  Unlock,
  Check,
  RotateCw,
  Trash2,
  RefreshCw,
  Edit2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";
import SignatureArt from "@/components/elements/SignatureArt";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { cn } from "@/lib/utils";

interface RangeControlProps {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  suffix: string;
  onAction?: () => void;
  actionLabel?: string;
}

function RangeControl({
  label,
  value,
  setValue,
  min,
  max,
  suffix,
  onAction,
  actionLabel,
}: RangeControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>{label}</span>
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="text-[11px] font-medium text-primary-500 hover:text-primary-600 cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className="flex-1 accent-primary-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex items-center border border-slate-200 rounded-md px-2 py-1 bg-slate-50 min-w-[54px] justify-end">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            className="w-8 text-right text-xs bg-transparent outline-none font-semibold text-slate-700"
          />
          <span className="text-[10px] text-slate-400 ml-0.5">{suffix}</span>
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

export function EditorView() {
  const router = useRouter();
  const { notify } = useApp();

  const [locked, setLocked] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);

  const handleSave = () => {
    notify("Signed document saved successfully");
  };

  const handleReset = () => {
    setScale(100);
    setRotation(0);
    setOpacity(100);
    notify("Signature transform reset");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 overflow-hidden select-none">
      {/* Top Toolbar */}
      <header className="h-16 flex-none bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between z-20">
        {/* Left: Back & Document Title */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/documents")}
            className="text-slate-600 hover:text-slate-900"
            title="Back to documents"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-slate-900 truncate max-w-[180px] sm:max-w-none">
                Vendor Agreement.pdf
              </span>
              <Edit2 className="h-3 w-3 text-slate-400 cursor-pointer hover:text-slate-700" />
            </div>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Saved 2m ago
            </p>
          </div>
        </div>

        {/* Center: Zoom & Page Navigation */}
        <div className="hidden md:flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50/80 shadow-2xs">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white"
            title="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs font-semibold text-slate-700 w-12 text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(160, zoom + 10))}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white"
            title="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <button
            onClick={() => setZoom(100)}
            className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded"
          >
            Fit to screen
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <div className="flex items-center gap-1 px-1">
            <button className="p-1 rounded text-slate-400 hover:text-slate-700">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-[11px] text-slate-600">
              Page <strong className="text-slate-900 font-semibold">1</strong>{" "}
              of 3
            </span>
            <button className="p-1 rounded text-slate-400 hover:text-slate-700">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hover:text-slate-900"
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 cursor-not-allowed"
            disabled
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </Button>

          <Button
            variant={locked ? "secondary" : "outline"}
            size="sm"
            onClick={() => setLocked(!locked)}
            className="text-xs gap-1.5 hidden sm:inline-flex"
          >
            {locked ? (
              <>
                <Lock className="h-3.5 w-3.5 text-amber-600" />
                <span>Locked</span>
              </>
            ) : (
              <>
                <Unlock className="h-3.5 w-3.5 text-slate-500" />
                <span>Lock</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            className="bg-primary-500 hover:bg-primary-600 text-white gap-1.5 shadow-sm text-xs"
          >
            <Check className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save signed document</span>
          </Button>
        </div>
      </header>

      {/* Editor Body: Canvas & Inspector */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Canvas Area */}
        <main className="flex-1 canvas-grid overflow-auto p-8 sm:p-12 flex justify-center items-start">
          <div
            className="w-[595px] min-h-[842px] bg-white shadow-2xl rounded-sm p-14 relative text-slate-700 transition-transform duration-150 ease-out origin-top shrink-0"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Document Header */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-100 mb-8">
              <Logo href="/editor" />
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                Master Services Agreement
              </span>
            </div>

            {/* Document Body */}
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
              Vendor Service Agreement
            </h2>
            <p className="text-[10px] text-slate-400 mb-6">
              Agreement No. SF–2025–0482 &nbsp; • &nbsp; Effective May 26, 2025
            </p>

            <div className="space-y-4 text-xs leading-relaxed text-slate-600 font-serif">
              <div>
                <h3 className="text-xs font-bold font-sans text-slate-800 uppercase tracking-wide mb-1">
                  1. Scope of services
                </h3>
                <p>
                  This Master Services Agreement is entered into by and between
                  Northstar Labs, Inc. (“Client”) and the service provider
                  identified below. Provider agrees to deliver the services and
                  associated materials described in each applicable Statement of
                  Work.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold font-sans text-slate-800 uppercase tracking-wide mb-1">
                  2. Term and termination
                </h3>
                <p>
                  This Agreement begins on the Effective Date and continues
                  until terminated in accordance with its terms. Either party
                  may terminate this Agreement upon thirty days’ written notice.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold font-sans text-slate-800 uppercase tracking-wide mb-1">
                  3. Confidentiality
                </h3>
                <p>
                  Each party agrees to maintain the confidentiality of all
                  proprietary information disclosed in connection with this
                  Agreement and to use such information solely for the intended
                  business purpose.
                </p>
              </div>
            </div>

            {/* Signature Placement Line */}
            <div className="absolute left-14 right-14 bottom-24 grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-2">
                <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                  Authorized Signature
                </span>
                <div className="h-px bg-slate-300 w-full" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                  Date
                </span>
                <div className="h-px bg-slate-300 w-full" />
              </div>
            </div>

            {/* Placed Interactive Signature Object */}
            <div
              className={cn(
                "w-48 h-16 absolute left-20 bottom-20 flex items-center justify-center border-2 transition-opacity",
                locked
                  ? "border-emerald-500 bg-emerald-500/5 cursor-default"
                  : "border-primary-500 bg-primary-500/5 cursor-move",
              )}
              style={{
                opacity: opacity / 100,
                transform: `rotate(${rotation}deg) scale(${scale / 100})`,
                transformOrigin: "center",
              }}
            >
              {!locked && (
                <>
                  <div className="handle-rotate" />
                  <div className="placed-signature-handle -top-1 -left-1" />
                  <div className="placed-signature-handle -top-1 -right-1" />
                  <div className="placed-signature-handle -bottom-1 -left-1" />
                  <div className="placed-signature-handle -bottom-1 -right-1" />
                </>
              )}
              <div className="w-full flex items-center justify-center">
                <SignatureArt />
              </div>
            </div>

            {/* Page Number */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-sans">
              1
            </span>
          </div>
        </main>

        {/* Inspector Sidebar */}
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col justify-between overflow-y-auto shrink-0 shadow-lg z-10">
          <div className="p-5 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Signature Settings
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust placement, scale, and opacity
              </p>
            </div>

            {/* Single User Signature Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Active Signature
                </label>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="h-16 rounded-xl border border-slate-200 bg-slate-50/70 p-2 flex items-center justify-center shadow-xs">
                <SignatureArt />
              </div>
              <p className="text-[10px] text-slate-400">
                Single authenticated signature for Ajay Kuwnar
              </p>
            </div>

            {/* Range Controls */}
            <RangeControl
              label="Scale"
              value={scale}
              setValue={setScale}
              min={20}
              max={200}
              suffix="%"
            />

            <RangeControl
              label="Rotation"
              value={rotation}
              setValue={setRotation}
              min={-180}
              max={180}
              suffix="°"
              onAction={() =>
                setRotation(rotation + 90 > 180 ? -180 : rotation + 90)
              }
              actionLabel="Rotate 90°"
            />

            <RangeControl
              label="Opacity"
              value={opacity}
              setValue={setOpacity}
              min={0}
              max={100}
              suffix="%"
            />

            {/* Position Coordinates */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Position (Canvas Coordinates)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
                  <span className="text-xs font-semibold text-slate-400 mr-2">
                    X
                  </span>
                  <input
                    value="184"
                    readOnly
                    className="w-full text-right text-xs bg-transparent outline-none font-semibold text-slate-700"
                  />
                  <span className="text-[10px] text-slate-400 ml-1">px</span>
                </div>
                <div className="flex items-center border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
                  <span className="text-xs font-semibold text-slate-400 mr-2">
                    Y
                  </span>
                  <input
                    value="628"
                    readOnly
                    className="w-full text-right text-xs bg-transparent outline-none font-semibold text-slate-700"
                  />
                  <span className="text-[10px] text-slate-400 ml-1">px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inspector Footer Actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => notify("Signature removed from canvas")}
                className="text-xs h-8 gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-xs h-8 border-slate-200 text-slate-700 hover:bg-white gap-1.5"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset</span>
              </Button>
            </div>
            <Button
              variant={locked ? "default" : "outline"}
              size="sm"
              onClick={() => setLocked(!locked)}
              className={cn(
                "w-full text-xs h-8 gap-1.5",
                locked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-slate-200 text-slate-700 hover:bg-white",
              )}
            >
              {locked ? (
                <>
                  <Unlock className="h-3.5 w-3.5" />
                  <span>Unlock Placement</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  <span>Lock Placement</span>
                </>
              )}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EditorView;
