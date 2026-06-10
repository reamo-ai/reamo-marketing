"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCalculator = pathname === "/calculator";

  useLayoutEffect(() => {
    document.body.classList.toggle("pt-[var(--nav-height)]", !isCalculator);
  }, [isCalculator]);

  if (isCalculator) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
