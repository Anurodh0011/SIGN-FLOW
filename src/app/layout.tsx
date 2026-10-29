import type { Metadata } from "next";
import "./globals.css";
import AppContextProvider from "@/helpers/contexts/AppContextProvider";
import { AuthProvider } from "@/helpers/contexts/AuthContextProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SignFlow — Digital Signature & Document SaaS",
  description:
    "Next-generation digital signature and document workflow platform. Upload, sign, manage, and verify documents securely.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading workspace...</div>}>
          <AuthProvider>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
