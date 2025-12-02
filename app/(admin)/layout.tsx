import type { ReactNode } from "react";
import AdminSidebar from "@/components/sidebar/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}