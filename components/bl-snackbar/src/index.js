import { useCallback, useEffect, useState } from 'react';

import { Snackbar } from './snackbar';
import { useClasses } from './use-classes';

const DEFAULT_HIDE_DURATION = 5000;

export default function SnackbarComponent({ component, eventHandlers }) {
  const {
    style,
    showClose,
    showAction,
    actionContent,
    snackContent,
    autoHide,
    autoHideDuration,
    verticalPosition,
    horizontalPosition,
    type,
    maxSnacks,
    outline,
    display
  } = component;

  const { onClose, onAction } = eventHandlers;

  const [snackData, setSnackData] = useState([]);

  const close = useCallback(id => {
    if (onClose) {
      onClose();
    }

    setSnackData(prev => prev.filter(el => el.id !== id));
  }, [onClose]);

  const handleSnackbar = (isClose, isAction, actionText, text, snackType) => {
    const snackObject = {
      showClose    : isClose,
      showAction   : isAction,
      actionContent: actionText,
      snackContent : text,
      type         : snackType,
      id           : Date.now(),
      outline      : outline,
    };

    setSnackData(prev => [...prev, snackObject]);

    if (autoHide) {
      setTimeout(() => {
        setSnackData(prev => prev.filter(el => el.id !== snackObject.id));
      }, autoHideDuration || DEFAULT_HIDE_DURATION);
    }
  };

  component.create = (closable, hasAction, actionText, text, snackType) => {
    handleSnackbar(
      closable !== undefined ? closable : showClose,
      hasAction !== undefined ? hasAction : showAction,
      actionText || actionContent,
      text || snackContent,
      snackType || type);
  };

  useEffect(() => {
    if (snackData.length > maxSnacks) {
      setSnackData(prev => prev.slice(1));
    }
  }, [snackData]);

  if (!display) {
    return null;
  }

  const classes = useClasses(horizontalPosition, verticalPosition);

  return (
    <div className={ `bl-customComponent-snackbar' ${ classes }` } style={ style }>
      { !!snackData.length && snackData.map(el => {
        const { showClose, showAction, actionContent, snackContent, type, id, outline } = el;

        return (
          <div key={ id }>
            <Snackbar
              showClose={ showClose }
              showAction={ showAction }
              actionContent={ actionContent }
              snackContent={ snackContent }
              type={ type }
              onAction={ onAction }
              onClose={ close }
              id={ id }
              outline={ outline }
            />
          </div>
        );
      }) }
    </div>
  );
}
