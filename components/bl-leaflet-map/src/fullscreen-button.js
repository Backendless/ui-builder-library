import { useCallback, useEffect, useState } from 'react';

import { TurnOffFullscreenIcon, TurnOnFullscreenIcon } from './icons';

export function FullscreenButton({ component, eventHandlers }) {
  const { onFullscreenClick } = eventHandlers;

  const [currentFullscreen, setCurrentFullscreen] = useState(null);

  useEffect(() => {
    if (component.fullscreen !== undefined) {
      setCurrentFullscreen(component.fullscreen);
    }
  }, [component.fullscreen]);

  const handleClick = useCallback(() => {
    component.fullscreen = !currentFullscreen;

    onFullscreenClick({ fullscreen: component.fullscreen });
  }, [currentFullscreen]);

  return (
    <button className="control button fullscreen-button" onClick={ handleClick }>
      { currentFullscreen ? <TurnOffFullscreenIcon/> : <TurnOnFullscreenIcon/> }
    </button>
  );
}
