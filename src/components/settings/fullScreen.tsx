"use client";

import { useEffect, useState } from "react";
import { MaximizeIcon, MinimizeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        if (isFullScreen) {
          document.exitFullscreen();
        } else {
          document.body.requestFullscreen();
        }
      }}
    >
      {isFullScreen ? (
        <MinimizeIcon className="w-4" />
      ) : (
        <MaximizeIcon className="w-4" />
      )}
    </Button>
  );
};

export default FullScreen;
