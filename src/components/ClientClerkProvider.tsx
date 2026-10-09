"use client";
import { ClerkProvider } from "@clerk/react";

export function ClientClerkProvider({ children, publishableKey }: { children: React.ReactNode, publishableKey: string | undefined }) {
  // If we don't have a publishable key during build time, we must still render the provider
  // otherwise useAuth() inside pages will throw an error and crash the Next.js build.
  // We use a dummy test key to satisfy the provider.
  const key = publishableKey || "pk_test_ZHVtbXkua2V5LmNsZXJrLmFjY291bnRzLmRldiQ";
  
  return <ClerkProvider publishableKey={key}>{children}</ClerkProvider>;
}
