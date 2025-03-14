import type React from "react";

import { useEffect, useState } from "react";
import loadingAnimation from "@/assets/loading-animation.gif";

interface OverlayLoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function OverlayLoader({
  loading,
  children,
}: OverlayLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      {children}

      {mounted && loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32">
              <img src={loadingAnimation} alt="Animation" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
