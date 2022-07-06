import { useEffect } from 'react';

import { LoadersMap } from './loaders';

export default function BackdropSpinner({ component, eventHandlers }) {
  const { backdropVisibility, loaderType, display } = component;
  const { onClick, onOpen, onClose } = eventHandlers;

  useEffect(() => {
    onOpen();

    return onClose;
  }, []);

  if (!backdropVisibility && !display) {
    return null;
  }

  const Loader = LoadersMap[loaderType];

  return (
    <div onClick={ onClick } className={ 'bl-customComponent-backdrop ' + component.classList.join(' ') }>
      <Loader/>
    </div>
  );
}
