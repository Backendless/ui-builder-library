import { useState } from 'react';

import { AlertButton, AlertIcon, AlertTitle } from './subcomponents';

export default function Alert({ component, eventHandlers }) {
  const {
    style, display, classList, iconVisibility, messageType, messageTitle,
    messageText, variant, closeButtonVisibility, closingDuration,
  } = component;
  const { onClose } = eventHandlers;

  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const classes = useAlertClasses(variant, messageType, isClosing);
  const classesTitle = useTextClass('alert__title', variant, messageType);
  const classesAlertText = useTextClass('alert__text', variant, messageType);

  component.close = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, closingDuration);
  };

  if (!display || !isAlertVisible) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-alert ' + classList.join(' ') } style={ style }>
      <div className={ classes } style={{ animationDuration: `${ closingDuration }ms` }}>
        { iconVisibility && (
          <div className="alert__icon">
            <AlertIcon
              typeAlert={ messageType }
              variant={ variant }
            />
          </div>
        ) }

        <div className="alert__content">
          { messageTitle && (<AlertTitle title={ messageTitle } classesTitle={ classesTitle }/>) }
          <div className={ classesAlertText }>{ messageText }</div>
        </div>

        { closeButtonVisibility && (
          <AlertButton
            onClose={ onClose }
            variant={ variant }
          />
        ) }
      </div>
    </div>
  );
}

const useAlertClasses = (variant, messageType, isClosing) => {
  const classes = ['alert', variant, `${ variant }--${ messageType }`];

  classes.push(isClosing ? 'alert-close' : 'alert-open');

  return classes.join(' ');
};

const useTextClass = (initialClass, variant, messageType) => {
  const classes = [initialClass];

  classes.push(variant === 'alert-filled' ? '' : `${ initialClass }--${ messageType }`);

  return classes.join(' ');
};
