"use client";

import { usePathname } from "next/navigation";
import HeaderMenu from "./HeaderMenu";

export default function HeaderMenuConditional() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/games");

  if (hideHeader) return null;
  return <HeaderMenu />;
}
