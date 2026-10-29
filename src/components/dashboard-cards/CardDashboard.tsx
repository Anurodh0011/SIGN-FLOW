"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import Icon, { type IconName } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface CardDashboardProps {
  bgcolor?: string;
  IconComponent?: LucideIcon;
  iconName?: IconName;
  title: string;
  value: string;
  positive?: boolean;
  link?: string;
}

export default function CardDashboard({
  bgcolor = "bg-primary-500",
  IconComponent,
  iconName,
  title,
  value,
  positive = false,
  link,
}: CardDashboardProps) {
  const router = useRouter();

  const handleNavigation = () => {
    if (link) router.push(link);
  };

  return (
    <div
      role={link ? "button" : undefined}
      tabIndex={link ? 0 : undefined}
      onClick={link ? handleNavigation : undefined}
      onKeyDown={
        link ? (e) => e.key === "Enter" && handleNavigation() : undefined
      }
      className={cn(
        "w-full h-auto flex items-center rounded-2xl p-4 bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow",
        link && "cursor-pointer",
      )}
    >
      <div className="flex items-center gap-4 w-full">
        <span
          className={cn(
            "p-3 rounded-xl flex justify-center items-center text-white shrink-0 shadow-sm",
            bgcolor,
          )}
        >
          {IconComponent && <IconComponent size={22} />}
          {iconName && !IconComponent && <Icon name={iconName} size={22} />}
        </span>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 truncate capitalize">
              {title}
            </span>
          </div>
          <span className="text-2xl text-slate-900 font-bold tracking-tight mt-0.5">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
