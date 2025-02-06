'use client';

import React from "react";

import styles from './style.module.css';
import { ScrollableCanvas } from "./canvas";
import { useHandleWaveView } from "./operation";
import { useTransportAudio } from "./transportAudio";

export default function Page() {
  const { getPlayingPosition, setPlayingPosition } = useTransportAudio();

  return (
    <article className={styles.dia}>
      <section>
        <h1>Dia</h1>
      </section>
      <WaveView
        playingPositionGetter={getPlayingPosition}
        playingPositionSetter={setPlayingPosition}
      />
    </article>
  );
};

export const WaveView = React.memo(function useWV(props: {
  playingPositionGetter: () => number;
  playingPositionSetter: (time: number) => void;
}) {
  const {
    canvasRef,
    scrollableCanvasStyleWidth,
    handleResize,
    handleScroll,
    handlePointerDown,
    handleWheel,
  } = useHandleWaveView(props);

  return (
    <ScrollableCanvas
      ref={canvasRef}
      displayScrollbar
      scrollableCanvasStyleWidth={scrollableCanvasStyleWidth}
      scrollableCanvasStyleHeight="100%"
      onResize={handleResize}
      onScroll={handleScroll}
      onPointerDown={handlePointerDown}
      onWheel={handleWheel}
    />
  );
});