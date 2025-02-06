'use client';

import React, { Ref, useEffect, useImperativeHandle, useRef } from "react";

export type ScrollableCanvasElement = {
  readonly layer: HTMLCanvasElement | null;
  readonly scroller: HTMLDivElement | null;
};

export function ScrollableCanvas(props: {
  ref: Ref<ScrollableCanvasElement>,
  displayScrollbar?: boolean | undefined;
  scrollableCanvasStyleWidth?: React.CSSProperties["width"] | undefined;
  scrollableCanvasStyleHeight?: React.CSSProperties["height"] | undefined;
  onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
  onPointerDown?: React.PointerEventHandler<HTMLDivElement> | undefined;
  onWheel?: React.WheelEventHandler<HTMLDivElement> | undefined;
  onResize?: (() => void) | undefined;
}) {
  useImperativeHandle(
    props.ref,
    () =>
      ({
        get layer() {
          return canvasRef.current;
        },
        get scroller() {
          return scrollerRef.current;
        },
      }) satisfies ScrollableCanvasElement
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <AutoResizedCanvas
      ref={canvasRef}
      onResize={props.onResize}
    />
  )

}

export function AutoResizedCanvas(props: {
  onResize?: (() => void) | undefined,
  ref: Ref<HTMLCanvasElement>
}) {
  const {
    onResize,
    ref
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(
    ref,
    () => canvasRef.current,
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const directionIsHorizontal = getComputedStyle(canvas).writingMode.startsWith("horizontal");

        const size = entry.devicePixelContentBoxSize[0];
        const width = directionIsHorizontal ? size.inlineSize : size.blockSize;
        if (width < 10000) canvas.width = width;
        // canvas.height = directionIsHorizontal ? size.blockSize : size.inlineSize;

        onResize?.();
      });
    });
    observer.observe(container, { box: "device-pixel-content-box" });

    return () => {
      return observer.disconnect();
    };
  }, [onResize]);

  return (
    <div
      ref={containerRef}
    >
      <canvas ref={canvasRef}>
        Canvas is not supported in this browser.
      </canvas>
    </div>
  );
};










