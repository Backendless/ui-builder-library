import { useCallback, useRef } from 'react';

import Particles from './lib/particles.min';
import { loadParticles, useOptions } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function ParticlesComponent({ component, eventHandlers: { onLoad }, elRef, instanceId }) {
  const { classList, display, style, width, height } = component;

  const containerRef = useRef(null);

  const options = useOptions(component);

  const onInit = useCallback(async engine => await loadParticles(engine), []);
  const onLoaded = useCallback(({ sourceOptions, canvas }) => {
    elRef.current = canvas.element.parentNode;

    onLoad({ options: sourceOptions });
  }, [elRef, onLoad]);

  useComponentActions(component, containerRef);

  if (!display) {
    return null;
  }

  return (
    <Particles
      id={ `particles-${ instanceId }` }
      className={ cn('bl-customComponent-particles', classList) }
      width={ width }
      height={ height }
      container={ containerRef }
      options={ options }
      style={ style }
      init={ onInit }
      loaded={ onLoaded }
    />
  );
}

function useComponentActions(component, containerRef) {
  Object.assign(component, {
    start  : () => containerRef.current?.start(),
    stop   : () => containerRef.current?.stop(),
    play   : () => containerRef.current?.play(),
    pause  : () => containerRef.current?.pause(),
    destroy: () => containerRef.current?.destroy(),
    refresh: () => containerRef.current?.refresh(),
  });
}
