export function usePlayerHandlers(index, setIndex, audioUrls, setIsPlaying) {
  const skipBack = () => {
    if (index === 0) {
      setIndex(audioUrls.length - 1);
    } else {
      setIndex(index - 1);
    }

    setIsPlaying(true);
  };

  const skipNext = () => {
    if (index === audioUrls.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }

    setIsPlaying(true);
  };

  return { skipBack, skipNext };
}
