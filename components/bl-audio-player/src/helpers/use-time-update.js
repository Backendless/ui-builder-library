import { useState } from 'react';

import { changeTimeFormat } from './change-time-format';

export function useTimeUpdate(audioRef, currentTrack, setCurrentTrack) {
  const [timer, setTimer] = useState('00:00');
  
  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    const currentTimeProgress = changeTimeFormat(currentTime);

    setCurrentTrack({
      ...currentTrack,
      progress: currentTime / duration * 100,
      length  : duration,
    });
    
    setTimer(currentTimeProgress);
  };

  return { timer, onPlaying };
}
