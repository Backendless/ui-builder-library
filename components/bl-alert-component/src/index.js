import { useState, useMemo } from 'react';
import { useTypeAlert } from './use-type-alert';
import { AlertButton, AlertIcon, AlertTitle } from './subcomponents';

export default function MyCustomComponent({ component, eventHandlers }) {
  const {
    display,
    iconVisibility,
    messageType,
    messageTitle,
    messageText,
    styleVariants,
    isCloseButtonVisibility,
  } = component;
  const { onCloseButtonVisibility } = eventHandlers;

  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [alertAnimation, setAlertAnimation] = useState('alert-open');

  const alert = useMemo(() => {
    return useTypeAlert(messageType, messageTitle, messageText, styleVariants);
  }, [messageType, messageTitle, messageText, styleVariants]);

  component.closeButtonVisibility = () => {
    setAlertAnimation('alert-close');

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 80);
  };

  if (!display || !isAlertVisible) {
    return null;
  }

  return (
    <div className="bl-customComponent-alert">
      <div
        className={`alert ${styleVariants} ${styleVariants}--${alert.type} ${alertAnimation}`}
      >
        {iconVisibility && <AlertIcon svg={alert.svg} />}

        <div className="alert__content">
          { alert.title && <AlertTitle title={alert.title} />}
          <div className="alert__text">{alert.message}</div>
        </div>

        {isCloseButtonVisibility && (
          <AlertButton
            onCloseButtonVisibility={onCloseButtonVisibility}
            styleVariants={styleVariants}
          />
        )}
      </div>
    </div>
  );
};
