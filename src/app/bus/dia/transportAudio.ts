export function useTransportAudio() {
  return {
    getPlayingPosition: () => 0,
    setPlayingPosition: (time: number) => {
      console.log(time);
    },
  }
}