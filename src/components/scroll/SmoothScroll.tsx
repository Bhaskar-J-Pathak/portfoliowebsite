"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.86,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
