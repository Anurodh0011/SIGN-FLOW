"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Download,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { INITIAL_DOCUMENTS } from "@/constants/documents.constants";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { simulateDownload } from "@/helpers/file.helper";
import { cn } from "@/lib/utils";

export function DocumentsView() {
  const router = useRouter();
  const { openModal, notify } = useApp();
  const [filter, setFilter] = useState<"All" | "Draft" | "Signed">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = INITIAL_DOCUMENTS.filter((d) => {
    const matchesFilter = filter === "All" || d.status === filter;
    const matchesSearch = d.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (docName: string) => {
    simulateDownload(docName);
    notify(`Download started for ${docName}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-primary-500 tracking-wider uppercase">
            Documents
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            Manage Documents
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload, sign, organize, and download your files.
          </p>
        </div>
        <Button
          onClick={() => openModal("upload")}
          className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Upload document</span>
        </Button>
      </div>

      {/* Main Table Card */}
      <Card className="border border-slate-200/80 shadow-sm bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs h-9 bg-slate-50 border-slate-200"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center p-1 bg-slate-100 rounded-lg">
              {(["All", "Draft", "Signed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer",
                    filter === f
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-500 hover:text-slate-800",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <select className="h-9 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-primary-500">
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5">Uploaded</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Actions</th>
                  <th className="py-3 px-5 text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <span className="w-8 h-9 rounded-md bg-rose-50 border border-rose-100 text-rose-600 font-bold text-[9px] flex items-center justify-center shrink-0">
                          PDF
                        </span>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {doc.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-slate-500 font-medium">
                      {doc.date}
                    </td>
                    <td className="py-3 px-5">
                      <Badge
                        variant={
                          doc.status === "Signed" ? "success" : "warning"
                        }
                        className="text-[11px] font-medium"
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        {doc.status === "Draft" ? (
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-primary-500 hover:bg-primary-600 text-white"
                            onClick={() => router.push("/editor")}
                          >
                            Attach signature
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5"
                              onClick={() => handleDownload(doc.name)}
                            >
                              <Download className="h-3 w-3" />
                              <span>Download</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-slate-600 hover:bg-slate-100 gap-1"
                              onClick={() => notify(`Previewing ${doc.name}`)}
                            >
                              <Eye className="h-3 w-3" />
                              <span>Preview</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-400 text-sm"
                    >
                      No documents found matching your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of 24 documents</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-slate-200 gap-1"
                disabled
              >
                <ChevronLeft className="h-3 w-3" />
                <span>Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-slate-200 gap-1"
              >
                <span>Next</span>
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DocumentsView;
