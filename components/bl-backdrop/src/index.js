import { useEffect } from 'react';

import { LoadersMap } from './loaders';
import { useUpdateEffect } from './use-update-effect';

export default function BackdropSpinner({ component, eventHandlers }) {
  const { backdropVisibility, loaderType, display, style } = component;
  const { onClick, onOpen, onClose } = eventHandlers;

  useUpdateEffect(() => {
    if (!backdropVisibility || !display) {
      onClose();
    }
  }, [backdropVisibility, display]);

  useEffect(() => {
    if (backdropVisibility && display) {
      onOpen();
    }
  }, [display, backdropVisibility]);

  if (!backdropVisibility || !display) {
    return null;
  }

  const Loader = LoadersMap[loaderType];

  return (
    <div
      onClick={ onClick }
      className={ 'bl-customComponent-backdrop ' + component.classList.join(' ') }
      style={ style }>
      <Loader/>
    </div>
  );
}
