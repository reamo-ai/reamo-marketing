"use client";

import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import GlobalScrollReveal from "@/components/GlobalScrollReveal";
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
    document.body.classList.toggle("no-nav-pad", isCalculator);
  }, [isCalculator]);

  if (isCalculator) {
    return (
      <>
        <GlobalScrollReveal />
        {children}
      </>
    );
  }

  return (
    <>
      <GlobalScrollReveal />
      <Nav />
      {children}
      <Footer />
      <ChatWidget />
    </>
  );
}
