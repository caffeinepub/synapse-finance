import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  duration = 1800,
  decimals = 0,
  prefix = "",
): { value: string; ref: React.RefObject<HTMLDivElement | null> } {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - (1 - progress) ** 3;
            setValue(eased * target);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 },
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target, duration]);

  const formatted = `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;

  return { value: formatted, ref };
}
