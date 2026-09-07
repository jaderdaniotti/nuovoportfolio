import type { ReactNode } from "react";

export function InnerPageShell({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
