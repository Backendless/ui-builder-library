import { useEffect, useState } from 'react';

import { AlertButton, AlertIcon, AlertTitle } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export default function Alert({ component, eventHandlers: { onClose }, elRef }) {
  const {
    style, display, classList, iconVisibility, messageType, messageTitle,
    messageText, variant, closeButtonVisibility, closingDuration,
  } = component;

  const [isClosing, setIsClosing] = useState(!display);

  useEffect(() => {
    setIsClosing(!display);
  }, [display]);

  useEffect(() => {
    const duration = isClosing ? closingDuration : 0;

    setTimeout(() => {
      component.display = !isClosing;
    }, duration);
  }, [isClosing]);

  const closeAlert = () => {
    setIsClosing(true);

    onClose();
  };

  component.close = () => closeAlert();
  component.open = () => setIsClosing(false);

  if (!display && isClosing) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-alert', classList) } style={ style }>
      <div
        className={ cn('alert', variant, `${ variant }--${ messageType }`, { 'alert-close': isClosing }) }
        style={{ animationDuration: `${ closingDuration }ms` }}>

        { iconVisibility && (
          <div className="alert__icon">
            <AlertIcon typeAlert={ messageType } variant={ variant }/>
          </div>
        ) }

        <div className="alert__content">
          { messageTitle && (
            <AlertTitle
              title={ messageTitle }
              classesTitle={ cn('alert__title', { [`alert__title--${ messageType }`]: variant !== 'alert-filled' }) }
            />
          ) }

          <div className={ cn('alert__text', { [`alert__text--${ messageType }`]: variant !== 'alert-filled' }) }>
            { messageText }
          </div>
        </div>

        { closeButtonVisibility && (
          <AlertButton onClose={ closeAlert } variant={ variant }/>
        ) }
      </div>
    </div>
  );
}
