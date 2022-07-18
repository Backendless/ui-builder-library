import { useCallback, useState, useEffect } from 'react';

import { TurnOnFullscreenIcon } from './icons';
import { TurnOffFullscreenIcon } from './icons';

export function FullscreenButton({ fullscreen, eventHandlers }) {
  const { onFullscreenClick } = eventHandlers;

  const [currentFullscreen, setCurrentFullscreen] = useState(null);

  useEffect(() => {
    if (fullscreen !== undefined) {
      setCurrentFullscreen(fullscreen);
    }
  }, [fullscreen]);

  const handleClick = useCallback(() => {
    onFullscreenClick({ fullscreen: !currentFullscreen });
  }, [currentFullscreen]);

  const Icon = currentFullscreen ? TurnOffFullscreenIcon : TurnOnFullscreenIcon;

  return (
    <button
      className="control button fullscreen-button"
      onClick={ handleClick }>
      <Icon/>
    </button>
  );
}
