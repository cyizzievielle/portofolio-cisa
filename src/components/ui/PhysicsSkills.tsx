import { useEffect, useRef, useState } from "react";
import { skillGroups } from "../../data/skills";
import { useTheme } from "../../context/ThemeContext";

type PhysicsItem = {
  name: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
};

export function PhysicsSkills() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<PhysicsItem[]>([]);
  const itemElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number | null>(null);

  // Dragging state
  const dragIdxRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const prevMousePosRef = useRef({ x: 0, y: 0 });

  const [skillsList] = useState(() =>
    skillGroups.flatMap((group) => group.items)
  );

  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });

  const softCard = dark
    ? "border-violet-500/15 bg-violet-400/5 hover:border-violet-400/30 hover:bg-violet-400/10"
    : "border-rose-200 bg-white hover:border-rose-300 hover:bg-rose-50/20";

  // Initialize positions randomly near top
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    setDimensions({ width: w, height: h });

    itemsRef.current = skillsList.map((skill, index) => {
      // Space them out slightly to prevent massive overlap initially
      const row = Math.floor(index / 5);
      const col = index % 5;
      return {
        ...skill,
        x: col * 100 + 40 + Math.random() * 20,
        y: row * 50 + 40,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        width: 120, // default, will be updated after mount
        height: 38, // default, will be updated after mount
      };
    });

    // Update actual sizes from DOM
    setTimeout(() => {
      itemElementsRef.current.forEach((el, idx) => {
        if (el && itemsRef.current[idx]) {
          itemsRef.current[idx].width = el.offsetWidth;
          itemsRef.current[idx].height = el.offsetHeight;
        }
      });
    }, 120);

    const handleResize = () => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setDimensions({ width: r.width, height: r.height });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [skillsList]);

  // Main physics loop
  useEffect(() => {
    const gravity = 0.22;
    const bounce = 0.45;
    const friction = 0.98;

    const updatePhysics = () => {
      const items = itemsRef.current;
      const w = dimensions.width;
      const h = dimensions.height;

      // 1. If dragging, update the dragged item velocity and position
      if (dragIdxRef.current !== null) {
        const idx = dragIdxRef.current;
        const item = items[idx];
        if (item) {
          // Calculate velocity from mouse movement
          item.vx = mousePosRef.current.x - prevMousePosRef.current.x;
          item.vy = mousePosRef.current.y - prevMousePosRef.current.y;
          
          item.x = mousePosRef.current.x - dragOffsetRef.current.x;
          item.y = mousePosRef.current.y - dragOffsetRef.current.y;

          // Keep in bounds
          item.x = Math.max(0, Math.min(w - item.width, item.x));
          item.y = Math.max(0, Math.min(h - item.height, item.y));

          // Save current mouse pos as prev for next frame
          prevMousePosRef.current = { ...mousePosRef.current };
        }
      }

      // 2. Apply physics forces
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (i === dragIdxRef.current) continue; // Skip forces on dragged item

        // Gravity
        item.vy += gravity;

        // Position update
        item.x += item.vx;
        item.y += item.vy;

        // Boundary collisions
        // Floor
        if (item.y + item.height > h) {
          item.y = h - item.height;
          item.vy = -item.vy * bounce;
          item.vx *= friction;
        }
        // Ceiling
        if (item.y < 0) {
          item.y = 0;
          item.vy = -item.vy * bounce;
        }
        // Left wall
        if (item.x < 0) {
          item.x = 0;
          item.vx = -item.vx * bounce;
        }
        // Right wall
        if (item.x + item.width > w) {
          item.x = w - item.width;
          item.vx = -item.vx * bounce;
        }
      }

      // 3. Circle-like / Bounding-box collisions between badges
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];

          // Bounding box definitions
          const aLeft = a.x;
          const aRight = a.x + a.width;
          const aTop = a.y;
          const aBottom = a.y + a.height;

          const bLeft = b.x;
          const bRight = b.x + b.width;
          const bTop = b.y;
          const bBottom = b.y + b.height;

          // Check overlap
          const overlapX = Math.min(aRight, bRight) - Math.max(aLeft, bLeft);
          const overlapY = Math.min(aBottom, bBottom) - Math.max(aTop, bTop);

          if (overlapX > 0 && overlapY > 0) {
            // Collision detected! Push apart along the axis of smallest overlap
            const centerX_A = a.x + a.width / 2;
            const centerY_A = a.y + a.height / 2;
            const centerX_B = b.x + b.width / 2;
            const centerY_B = b.y + b.height / 2;

            if (overlapX < overlapY) {
              const pushX = overlapX * 0.52; // slight extra push to prevent sticking
              if (centerX_A < centerX_B) {
                if (i !== dragIdxRef.current) a.x -= pushX;
                if (j !== dragIdxRef.current) b.x += pushX;
                // Swap velocities + bounce
                const temp = a.vx;
                a.vx = b.vx * bounce;
                b.vx = temp * bounce;
              } else {
                if (i !== dragIdxRef.current) a.x += pushX;
                if (j !== dragIdxRef.current) b.x -= pushX;
                const temp = a.vx;
                a.vx = b.vx * bounce;
                b.vx = temp * bounce;
              }
            } else {
              const pushY = overlapY * 0.52;
              if (centerY_A < centerY_B) {
                if (i !== dragIdxRef.current) a.y -= pushY;
                if (j !== dragIdxRef.current) b.y += pushY;
                const temp = a.vy;
                a.vy = b.vy * bounce;
                b.vy = temp * bounce;
              } else {
                if (i !== dragIdxRef.current) a.y += pushY;
                if (j !== dragIdxRef.current) b.y -= pushY;
                const temp = a.vy;
                a.vy = b.vy * bounce;
                b.vy = temp * bounce;
              }
            }
          }
        }
      }

      // 4. Update CSS styles of DOM nodes directly (super fast, GPU accelerated)
      itemElementsRef.current.forEach((el, idx) => {
        const item = items[idx];
        if (el && item) {
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        }
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions]);

  // Handle Dragging Events
  const handleStartDrag = (idx: number, clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    const item = itemsRef.current[idx];
    if (item) {
      dragIdxRef.current = idx;
      dragOffsetRef.current = {
        x: localX - item.x,
        y: localY - item.y,
      };
      mousePosRef.current = { x: localX, y: localY };
      prevMousePosRef.current = { x: localX, y: localY };
    }
  };

  const handleDrag = (clientX: number, clientY: number) => {
    if (dragIdxRef.current === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    mousePosRef.current = { x: localX, y: localY };
  };

  const handleEndDrag = () => {
    dragIdxRef.current = null;
  };

  // Toss all items randomly into the air
  const handleToss = () => {
    itemsRef.current.forEach((item) => {
      item.vx = (Math.random() - 0.5) * 14;
      item.vy = -Math.random() * 12 - 5;
    });
  };

  return (
    <div className="relative w-full">
      {/* Physics Container Box */}
      <div
        ref={containerRef}
        className={`relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-[32px] border transition-colors duration-300 p-4 ${
          dark
            ? "border-violet-500/10 bg-violet-950/10"
            : "border-rose-100 bg-rose-50/20"
        }`}
        onMouseMove={(e) => handleDrag(e.clientX, e.clientY)}
        onMouseLeave={handleEndDrag}
        onMouseUp={handleEndDrag}
        onTouchMove={(e) => {
          if (e.touches[0]) handleDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handleEndDrag}
        onTouchCancel={handleEndDrag}
      >
        {/* Interactive Badges */}
        {skillsList.map((skill, idx) => (
          <div
            key={skill.name}
            ref={(el) => { itemElementsRef.current[idx] = el; }}
            onMouseDown={(e) => handleStartDrag(idx, e.clientX, e.clientY)}
            onTouchStart={(e) => {
              if (e.touches[0]) handleStartDrag(idx, e.touches[0].clientX, e.touches[0].clientY);
            }}
            className={`absolute flex items-center gap-2 rounded-2xl border px-3.5 py-2 transition-shadow duration-300 hover:shadow-md cursor-grab active:cursor-grabbing select-none shrink-0 ${softCard}`}
            style={{
              left: 0,
              top: 0,
              willChange: "transform",
            }}
          >
            <span className="shrink-0 text-lg" style={{ color: skill.color }}>
              {skill.icon}
            </span>
            <span
              className={`text-xs font-bold ${
                dark ? "text-rose-200/90" : "text-[#4a3558]"
              }`}
            >
              {skill.name}
            </span>
          </div>
        ))}

        {/* Floating Instruction & Toss Button */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <p className={`text-xs font-semibold select-none ${dark ? "text-rose-200/40" : "text-[#7a6188]/50"}`}>
            💡 Grab, throw, or drag the badges!
          </p>
          <button
            type="button"
            onClick={handleToss}
            className="pointer-events-auto rounded-full bg-gradient-to-r from-rose-400 to-violet-500 px-4 py-2 text-xs font-black text-white shadow-[0_8px_20px_rgba(168,85,247,0.25)] transition hover:-translate-y-0.5 active:scale-95"
          >
            💥 Toss Stack
          </button>
        </div>
      </div>
    </div>
  );
}
