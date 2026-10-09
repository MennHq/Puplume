"use client";
import { ClerkProvider } from "@clerk/react";

export function ClientClerkProvider({ children, publishableKey }: { children: React.ReactNode, publishableKey: string | undefined }) {
  if (!publishableKey) return <>{children}</>;
  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}
