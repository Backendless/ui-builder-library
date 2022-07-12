import { useState, useEffect } from 'react';
import { AlertButton, AlertIcon, AlertTitle } from './subcomponents';

export default function MyCustomComponent({ component, eventHandlers }) {
  const {
    display,
    classList,
    iconVisibility,
    messageType,
    messageTitle,
    messageText,
    variant,
    isCloseButtonVisibility,
    speedCloseAnimation,
  } = component;
  const { onCloseButton } = eventHandlers;

  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [alertAnimation, setAlertAnimation] = useState('');
  const alertClass = useAlertClass(variant, messageType, alertAnimation);
  
  useEffect(() => {
    setAlertAnimation(isAlertVisible ? 'alert-open' : 'alert-close');
  }, [isAlertVisible]);

  component.closeButtonAction = () => {
    setAlertAnimation('alert-close');

    setTimeout(() => {
      setIsAlertVisible(false);
    }, (speedCloseAnimation * 1000) - 50);
  };

  if (!display || !isAlertVisible) {
    return null;
  }

  return (
    <div className={'bl-customComponent-alert ' + classList.join(' ')}>
      <div
        className={alertClass}
        style={{animationDuration: `${speedCloseAnimation}s`}}
      >
        {iconVisibility && (
          <div className="alert__icon">
            <AlertIcon
              typeAlert={messageType}
              variants={variant}
            />
          </div>
        )}

        <div className="alert__content">
          {messageTitle && (
            <AlertTitle title={messageTitle} />
          )}
          <div className="alert__text">{messageText}</div>
        </div>

        {isCloseButtonVisibility && (
          <AlertButton
            onCloseButton={onCloseButton}
            variants={variant}
          />
        )}
      </div>
    </div>
  );
};

const useAlertClass = (variant, messageType, alertAnimation) => {
  return `alert ${variant} ${variant}--${messageType} ${alertAnimation}`
}
