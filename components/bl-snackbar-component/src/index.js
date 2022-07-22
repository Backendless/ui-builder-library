import { useState, useEffect, useCallback } from 'react';
import { useClasses } from './use-classes';
import { Action } from './button';
import { CloseIcon, IconsMap } from './icons';

const DEFAULT_HIDE_DURATION = 5000;

export default function SnackbarComponent({ component, eventHandlers }) {
  const {
    autoHideDuration  : aHideDur,
    snackContent      : snCont,
    autoHide          : aHide,
    horizontalPosition: horPos,
    verticalPosition  : verPos,
    type              : cType,
    showClose         : shClose,
    showAction        : shAction,
    actionContent     : actCon,
  } = component;

  const {
    onClose,
    onAction,
  } = eventHandlers;

  const [visible, setVisible] = useState(false);
  const [showClose, setShowClose] = useState(shClose);
  const [showAction, setShowAction] = useState(shAction);
  const [actionContent, setActionContent] = useState(actCon);
  const [snackContent, setSnackContent] = useState(snCont);
  const [autoHide, setAutoHide] = useState(aHide);
  const [autoHideDuration, setAutoHideDuration] = useState(aHideDur);
  const [verticalPosition, setVerticalPosition] = useState(verPos);
  const [horizontalPosition, setHorizontalPosition] = useState(horPos);
  const [type, setType] = useState(cType);

  component.visibility = (show) => {
    setVisible(show);
  };

  component.options = (
    showClose,
    showAction,
    actionContent,
    snackContent,
    autoHide,
    duration,
    vertical,
    horizontal,
    type
  ) => {
    setShowClose(prev => showClose !== undefined ? !!showClose : prev);
    setShowAction(prev => showAction !== undefined ? !!showAction : prev);
    setActionContent(prev => actionContent !== undefined ? actionContent : prev);
    setSnackContent(prev => snackContent !== undefined ? snackContent : prev);
    setAutoHide(prev => autoHide !== undefined ? !!autoHide : prev);
    setAutoHideDuration(prev => !isNaN(duration) ? duration : prev);
    setVerticalPosition(prev => vertical !== undefined ? vertical : prev);
    setHorizontalPosition(prev => horizontal !== undefined ? horizontal : prev);
    setType(prev => type !== undefined ? type : prev);
    setVisible(true);
  };

  const classes = useClasses(horizontalPosition, verticalPosition, type, visible);

  const Icon = IconsMap[type];

  useEffect(() => {
    if (autoHide && visible) {
      setTimeout(() => {
        setVisible(false);
      }, autoHideDuration || DEFAULT_HIDE_DURATION);
    }
  }, [visible]);

  const close = useCallback(() => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className={ classes }>
      <div className="text">
        { Icon && (
          <Icon/>
        ) }
        <div className="content">
          { snackContent }
        </div>
      </div>
      <div className="buttons">
        { showAction && actionContent && (
          <Action className="action" onClick={ onAction }> { actionContent } </Action>) }
        { showClose && (<Action className="close" onClick={ close }> { CloseIcon() } </Action>) }
      </div>
    </div>
  );
}
