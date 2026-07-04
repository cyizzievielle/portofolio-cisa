import { useEffect } from "react";

export function useCursorEffect() {
  useEffect(() => {
    const love = document.getElementById("cursorLove") as HTMLDivElement | null;
    const glow = document.getElementById("cursorGlow") as HTMLDivElement | null;

    if (!love || !glow) return;

    let rafId = 0;
    let lastSpawn = 0;

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      love.style.left = x + "px";
      love.style.top = y + "px";

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.left = x + "px";
        glow.style.top = y + "px";
      });

      spawnSparkle(x, y);
    };

    function spawnSparkle(x: number, y: number) {
      const now = performance.now();
      if (now - lastSpawn < 18) return;
      lastSpawn = now;

      const s = document.createElement("div");
      s.className = "sparkle";

      const ox = (Math.random() - 0.5) * 16;
      const oy = (Math.random() - 0.5) * 16;

      s.style.left = x + ox + "px";
      s.style.top = y + oy + "px";

      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
