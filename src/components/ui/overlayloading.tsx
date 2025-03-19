import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ReactNode } from "react";
import loadingAnimation from "@/assets/loading-animation.gif";

interface OverlayLoaderProps {
  loading: boolean;
  children: ReactNode;
}

export default function OverlayLoader({ loading, children }: OverlayLoaderProps) {
  return (
    <div className="relative">
      {children}

      {/* ShadCN Dialog with a lighter background overlay */}
      <Dialog open={loading}>
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <DialogContent className="bg-transparent shadow-none border-none flex items-center justify-center">
            <img src={loadingAnimation} alt="Loading..." className="w-32 h-32" />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
