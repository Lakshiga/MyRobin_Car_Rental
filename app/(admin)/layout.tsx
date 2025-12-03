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

  if (isLoading) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Box className="text-center">
          <CircularProgress className="!text-blue-600" />
          <Typography variant="body1" className="!mt-4 !text-slate-600">
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
    <Box className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AdminSidebar />
      <Box
        component="main"
        className="flex-1 p-4 md:p-8 pt-16 md:pt-8"
        sx={{ marginLeft: { md: "280px" } }}
      >
        <Box className="mx-auto max-w-7xl">{children}</Box>
      </Box>
    </Box>
  );
}
