import { useState, useEffect, useRef, type ReactNode } from "react";

interface ViewportSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: string;
}

export default function ViewportSection({
  children,
  fallback,
  minHeight = "400px",
}: ViewportSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : fallback || <div style={{ height: minHeight }} />}
    </div>
  );
}
