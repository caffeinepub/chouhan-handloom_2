import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      });
    };

    const onMouseDown = () => cursor.classList.add("active");
    const onMouseUp = () => cursor.classList.remove("active");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-glow hidden md:block"
      aria-hidden="true"
    />
  );
}
