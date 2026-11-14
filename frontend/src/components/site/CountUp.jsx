import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export const CountUp = ({ to, suffix = "", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(() => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? to : 0));

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const controls = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref} className={className} aria-label={`${to}${suffix}`}>{val}{suffix}</span>;
};
