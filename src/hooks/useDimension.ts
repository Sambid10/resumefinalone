"use client"
import React, { useEffect, useState } from "react";

export default function useDimension(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const [dimension, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;
    function getDimension() {
      return {
        width: currentRef?.offsetWidth || 0,
        height: currentRef?.offsetHeight || 0,
      };
    }
    const resizer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions(getDimension());
      }
    });
    if (currentRef) {
      resizer.observe(currentRef);
      setDimensions(getDimension());
    }
    return () => {
      if (currentRef) {
        resizer.unobserve(currentRef);
      }
      resizer.disconnect();
    };
  }, [containerRef]);
  return dimension;
}
