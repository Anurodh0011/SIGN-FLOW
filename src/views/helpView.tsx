"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Ticket,
  ChevronRight,
  Upload,
  Lock,
  MessageSquare,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { INITIAL_DOCUMENTS } from "@/constants/documents.constants";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { cn } from "@/lib/utils";

export function HelpView() {
  const { notify } = useApp();
  const [tab, setTab] = useState<"new" | "history">("new");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Upload issue");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify("Support ticket submitted successfully. We will reply shortly.");
      setSubject("");
      setMessage("");
      setTab("history");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-primary-500 tracking-wider uppercase">
            Support Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            How can we help?
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Send us a message and our support team will get back to you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Ticket Card (Left 2 cols) */}
        <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm bg-white overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 px-6 pt-3">
            <button
              onClick={() => setTab("new")}
              className={cn(
                "pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer",
                tab === "new"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-slate-500 hover:text-slate-800",
              )}
            >
              New ticket
            </button>
            <button
              onClick={() => setTab("history")}
              className={cn(
                "pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5",
                tab === "history"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-slate-500 hover:text-slate-800",
              )}
            >
              <span>Ticket history</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-600 font-bold">
                3
              </span>
            </button>
          </div>

          <CardContent className="p-6">
            {tab === "new" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Subject
                  </label>
                  <Input
                    required
                    placeholder="Briefly describe your issue"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="text-xs bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option>Upload issue</option>
                      <option>Signature placement</option>
                      <option>Download</option>
                      <option>Account</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Related document
                    </label>
                    <select className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 outline-none focus:ring-1 focus:ring-primary-500">
                      <option>Select a document</option>
                      {INITIAL_DOCUMENTS.map((d) => (
                        <option key={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what happened and what you expected..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 outline-none focus:ring-1 focus:ring-primary-500 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Attachment{" "}
                    <em className="text-slate-400 font-normal">Optional</em>
                  </label>
                  <button
                    type="button"
                    onClick={() => notify("Attachment browser opened")}
                    className="w-full p-4 rounded-xl border border-dashed border-slate-300 hover:border-primary-400 bg-slate-50/50 hover:bg-purple-50/20 transition-all flex items-center justify-center gap-3 text-slate-500 cursor-pointer"
                  >
                    <Upload className="h-5 w-5 text-primary-500" />
                    <div className="text-left">
                      <span className="text-xs font-semibold text-primary-600 block">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-[10px] text-slate-400">
                        PNG, JPG, PDF up to 10MB
                      </span>
                    </div>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    Your information is secure
                  </span>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-500 hover:bg-primary-600 text-white gap-2 shadow-sm text-xs"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit ticket</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="divide-y divide-slate-100">
                {[
                  [
                    "#SF-2048",
                    "Unable to preview signed PDF",
                    "Open",
                    "Today, 9:32 AM",
                  ],
                  [
                    "#SF-1984",
                    "Signature appears blurry",
                    "Resolved",
                    "May 18, 2025",
                  ],
                  [
                    "#SF-1842",
                    "Update billing email",
                    "Resolved",
                    "Apr 29, 2025",
                  ],
                ].map((t) => (
                  <div
                    key={t[0]}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-primary-500 flex items-center justify-center shrink-0">
                        <Ticket className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {t[1]}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {t[0]} · {t[3]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={t[2] === "Open" ? "warning" : "success"}>
                        {t[2]}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Help Sidebar */}
        <div className="space-y-4">
          {/* Quick Help Card */}
          <Card className="border border-slate-200/80 shadow-sm bg-white p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Quick Help Guides
            </h3>
            <div className="divide-y divide-slate-100">
              {[
                "Getting started with SignFlow",
                "How to place a signature",
                "Supported file formats",
                "Managing your account",
              ].map((guide) => (
                <button
                  key={guide}
                  onClick={() => notify(`Opening ${guide}`)}
                  className="w-full py-2.5 flex items-center justify-between text-xs text-slate-600 hover:text-primary-600 text-left transition-colors cursor-pointer"
                >
                  <span>{guide}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HelpView;
