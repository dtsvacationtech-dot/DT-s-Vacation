"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<"out" | "in">("out");

  useEffect(() => {
    // When route changes, immediately hide content
    setStage("out");
    
    // Wait a brief moment for DOM to update with new route content,
    // then trigger the fade-in animation
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        setStage("in");
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        opacity: stage === "out" ? 0 : 1,
        transform: stage === "out" ? "translateY(8px)" : "translateY(0px)",
      }}
    >
      {children}
    </div>
  );
}
