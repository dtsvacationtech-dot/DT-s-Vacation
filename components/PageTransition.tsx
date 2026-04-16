"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"idle" | "out" | "in">("idle");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) {
      // First render — fade in
      setStage("in");
      return;
    }

    // Route changed: play out → swap content → play in
    setStage("out");
    const timer = setTimeout(() => {
      prevPathname.current = pathname;
      setDisplayChildren(children);
      setStage("in");
    }, 300); // matches CSS transition duration

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // When children content changes during "in" stage, update display
  useEffect(() => {
    if (stage === "idle" || stage === "in") {
      setDisplayChildren(children);
    }
  }, [children, stage]);

  return (
    <div
      className="transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{
        opacity: stage === "out" ? 0 : 1,
        transform: stage === "out" ? "translateY(12px)" : "translateY(0px)",
      }}
    >
      {displayChildren}
    </div>
  );
}
