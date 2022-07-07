import { useCallback, useState, useEffect } from 'react';

import { TurnOnFullscreenSVG } from '../svg/turn-on-fullscreen';
import { TurnOffFullscreenSVG } from '../svg/turn-off-fullscreen';

export function FullscreenButton({ fullscreen, eventHandlers }) {
  const { onFullscreenClick } = eventHandlers;

  const [currentFullscreen, setCurrentFullscreen] = useState(null);

  useEffect(() => {
    if (fullscreen === true || fullscreen === false) {
      setCurrentFullscreen(fullscreen);
    }
  }, [fullscreen]);

  const handleClick = useCallback(() => {
    onFullscreenClick({
      fullscreen: !currentFullscreen
    });
  }, [currentFullscreen]);

  return (
    <button
      className="control button fullscreen-button"
      onClick={ handleClick }>
      { currentFullscreen
        ? <TurnOffFullscreenSVG/>
        : <TurnOnFullscreenSVG/>
      }
    </button>
  );
}
