import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}