"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Edit3,
  CheckCircle2,
  PenTool,
  Plus,
  ArrowUpRight,
  Download,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CardDashboard from "@/components/dashboard-cards/CardDashboard";
import { INITIAL_DOCUMENTS } from "@/constants/documents.constants";
import { getCurrentDateGreeting } from "@/utils/timeUtils";
import { useApp } from "@/helpers/contexts/AppContextProvider";
import { simulateDownload } from "@/helpers/file.helper";

export function DashboardView() {
  const router = useRouter();
  const { openModal, notify } = useApp();

  const handleDownload = (docName: string) => {
    simulateDownload(docName);
    notify(`Downloaded ${docName}`);
  };

  const statCards = [
    {
      title: "Total documents",
      value: "24",
      positive: true,
      IconComponent: FileText,
      bgcolor: "bg-purple-600",
      link: "/documents",
    },
    {
      title: "Draft documents",
      value: "6",
      positive: false,
      IconComponent: Edit3,
      bgcolor: "bg-amber-500",
      link: "/documents",
    },
    {
      title: "Signed documents",
      value: "18",
      positive: true,
      IconComponent: CheckCircle2,
      bgcolor: "bg-emerald-500",
      link: "/documents",
    },
    {
      title: "My signature",
      value: "Configured",
      positive: true,
      IconComponent: PenTool,
      bgcolor: "bg-indigo-600",
      link: "/signatures",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-primary-500 tracking-wider uppercase">
            {getCurrentDateGreeting()}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            Welcome back, Ajay 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here’s what’s happening with your documents today.
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

      {/* Stats Cards Grid matching pace-crm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {statCards.map((stat, i) => (
          <CardDashboard
            key={i}
            bgcolor={stat.bgcolor}
            IconComponent={stat.IconComponent}
            title={stat.title}
            value={stat.value}
            positive={stat.positive}
            link={stat.link}
          />
        ))}
      </div>

      {/* Recent Documents Table Card */}
      <Card className="border border-slate-200/80 shadow-sm overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-slate-100">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">
              Recent documents
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Your latest uploaded and signed files
            </p>
          </div>
          <Link href="/documents">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-slate-600 gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Document</th>
                  <th className="py-3 px-5">Uploaded</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Actions</th>
                  <th className="py-3 px-5 text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_DOCUMENTS.slice(0, 4).map((doc) => (
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
                      {doc.status === "Draft" ? (
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-primary-500 hover:bg-primary-600 text-white"
                          onClick={() => router.push("/editor")}
                        >
                          Attach signature
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5"
                          onClick={() => handleDownload(doc.name)}
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      )}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        aria-label="Options"
                        onClick={() => notify(`Options for ${doc.name}`)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardView;
