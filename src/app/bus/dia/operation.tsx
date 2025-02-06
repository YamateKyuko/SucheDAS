import { useRef } from "react";
import { ScrollableCanvasElement } from "./canvas";

export function useHandleWaveView(props: {
  playingPositionGetter: () => number;
  playingPositionSetter: (time: number) => void;
}) {
  console.log(props);
  const canvasRef = useRef<ScrollableCanvasElement>(null);
  const scrollableCanvasStyleWidth = "100%";
  const handleResize = () => {

  }
  const handleScroll = () => {

  }
  const handlePointerDown = () => {

  }
  const handleWheel = () => {

  }
  return {
    canvasRef,
    scrollableCanvasStyleWidth,
    handleResize,
    handleScroll,
    handlePointerDown,
    handleWheel,
  }
}