"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== "admin") {
        router.push("/auth/signin");
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  useEffect(() => {
    // Sync main content margin with sidebar state
    const updateMargin = () => {
      const sidebar = document.querySelector(".sidebar-container");
      const mainContent = document.querySelector(".admin-main-content");
      if (sidebar && mainContent) {
        const isCollapsed = sidebar.classList.contains("collapsed");
        if (isCollapsed) {
          mainContent.classList.add("collapsed");
        } else {
          mainContent.classList.remove("collapsed");
        }
      }
    };

    // Initial check
    updateMargin();

    // Watch for sidebar changes
    const observer = new MutationObserver(updateMargin);
    const sidebar = document.querySelector(".sidebar-container");
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    // Also listen for storage events
    window.addEventListener("sidebarToggle", updateMargin);

    return () => {
      observer.disconnect();
      window.removeEventListener("sidebarToggle", updateMargin);
    };
  }, []);

  if (isLoading) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Box className="text-center">
          <CircularProgress className="!text-blue-500" />
          <Typography variant="body1" className="!mt-4 !text-white">
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        .admin-main-content {
          margin-left: 280px;
          transition: margin-left 0.4s ease;
        }
        .admin-main-content.collapsed {
          margin-left: 80px;
        }
        @media (max-width: 768px) {
          .admin-main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
      <Box className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AdminSidebar />
        <Box
          component="main"
          className="flex-1 p-4 md:p-8 pt-16 md:pt-8 admin-main-content"
        >
          <Box className="mx-auto max-w-7xl">{children}</Box>
        </Box>
      </Box>
    </>
  );
}
