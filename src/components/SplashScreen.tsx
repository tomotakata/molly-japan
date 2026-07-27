"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"logo" | "fadeout" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeout"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`transition-all duration-1000 ease-out ${
          phase === "logo"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105"
        }`}
      >
        <Image
          src="/images/logo-white.png"
          alt="Molly"
          width={160}
          height={160}
          priority
          className="w-28 h-28 md:w-40 md:h-40 object-contain animate-fade-in"
        />
      </div>
    </div>
  );
}
