"use client";

import PrivateView from "@/views/privateView";
import DashboardView from "@/views/dashboardView";

export default function DashboardPage() {
  return (
    <PrivateView>
      <DashboardView />
    </PrivateView>
  );
}
