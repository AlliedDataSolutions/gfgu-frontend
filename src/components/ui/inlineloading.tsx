import type React from "react";
import loadingAnimation from "@/assets/loading-animation.gif";

interface InlineLoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function InlineLoader({ loading, children }: InlineLoaderProps) {
  return (
    <div className="relative">
      {loading && (
        <div className="w-full flex items-center justify-center py-4">
          <div className="w-32 h-32">
            <img src={loadingAnimation} alt="Animation" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
