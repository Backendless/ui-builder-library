import { useEffect, useState } from 'react';

import { changeTimeFormat } from '../utils/time';

export function TrackTime({ audioRef, timer }) {
  const [trackLength, setTrackLength] = useState('00:00');

  useEffect(() => {
    audioRef.current.addEventListener('loadeddata', () => {
      const length = changeTimeFormat(audioRef.current.duration);

      setTrackLength(length);
    });
  }, [trackLength]);

  return (
    <div className="track-time">
      <div>{ timer }</div>
      <span>/</span>
      <div>{ trackLength }</div>
    </div>
  );
}
