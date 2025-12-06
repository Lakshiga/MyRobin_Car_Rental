"use client";

import type { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import ThemeProvider from "./ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { client } from "@/lib/apollo-client";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
