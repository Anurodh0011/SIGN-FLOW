"use client";

import PrivateView from "@/views/privateView";
import DashboardView from "@/views/dashboardView";

export default function Home() {
  return (
    <PrivateView>
      <DashboardView />
    </PrivateView>
  );
}
