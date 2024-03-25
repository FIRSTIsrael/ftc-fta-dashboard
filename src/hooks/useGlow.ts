"use client";

import { useEffect, useState } from "react";

const useGlow = () => {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (glow) {
      const timeout = setTimeout(() => {
        setGlow(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [glow]);

  return {
    glow: glow ? "animate-glow" : "",
    trigger: () => {
      if (!glow) {
        setGlow(true);
        setTimeout(() => {
          setGlow(false);
        }, 1000);
      }
    },
  };
};

export default useGlow;
