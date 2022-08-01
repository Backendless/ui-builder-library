import { useCallback, useEffect, useState } from 'react';

import { Snackbar } from './snackbar';
import { useClasses } from './use-classes';

const DEFAULT_HIDE_DURATION = 5000;

export default function SnackbarComponent({ component, eventHandlers }) {
  const {
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
    display,
  } = component;

  const {
    onClose,
    onAction,
  } = eventHandlers;

  const [snackData, setSnackData] = useState([]);

  const classes = useClasses(horizontalPosition, verticalPosition);

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
      id           : new Date().getTime(),
    };

    setSnackData(prev => [...prev, snackObject]);

    if (autoHide) {
      setTimeout(() => {
        setSnackData(prev => prev.filter(el => el.id !== snackObject.id));
      }, autoHideDuration || DEFAULT_HIDE_DURATION);
    }
  };

  component.create = (isClose, isAction, actionText, text, snackType) => {
    handleSnackbar(
      isClose !== undefined ? isClose : showClose,
      isAction !== undefined ? isAction : showAction,
      actionText || actionContent,
      text || snackContent,
      snackType || type);
  };

  useEffect(() => {
    if (snackData.length > maxSnacks) {
      setSnackData(prev => {
        const arr = [...prev];
        arr.shift();
        return arr;
      });
    }
  }, [snackData]);

  return display && (
    <div className={ classes }>
      { !!snackData.length &&
      snackData.map(el => {
        const { showClose, showAction, actionContent, snackContent, type, id } = el;

        return (
          <div key={ id }>
            {
              Snackbar(showClose, showAction, actionContent, snackContent, type, onAction, close, id)
            }
          </div>
        );
      })
      }
    </div>
  );
}
