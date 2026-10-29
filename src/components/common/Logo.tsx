import React from "react";
import Link from "next/link";
import { PenTool } from "lucide-react";

export function Logo({ href = "/dashboard" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 no-underline group">
      <span className="flex items-center justify-center w-8 h-8 rounded-xl text-white shadow-md bg-gradient-to-br from-purple-600 to-indigo-600 group-hover:scale-105 transition-transform shrink-0">
        <PenTool className="h-4 w-4" />
      </span>
      <strong className="text-lg font-bold tracking-tight text-slate-900">
        SignFlow
      </strong>
    </Link>
  );
}

export default Logo;
