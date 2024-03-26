"use client";

import Expand from "@/assets/svgs/expand";
import { Button } from "../ui/button";

const FullScreen = () => (
  <Button
    variant="outline"
    size="sm"
    onClick={() => {
      document.body.requestFullscreen();
    }}
  >
    <Expand className="fill-current w-3" />
  </Button>
);

export default FullScreen;
