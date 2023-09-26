import { useCallback, useEffect, useMemo, useRef } from 'react';

import SweetAlert from './lib/sweetalert2';

const { cn } = BackendlessUI.CSSUtils;

export default function SweetAlertComponent({ component, eventHandlers, elRef }) {
  const {
    style, classList, display, position, title, text, icon, iconColor, footer, grow, backdrop,
    allowOutsideClick, allowEscapeKey, allowEnterKey, buttonsSettings, additionalSettings,
  } = component;

  const swalInstanceRef = useRef(null);

  const options = useMemo(() => ({
    position, title, text, icon, iconColor, footer, grow, backdrop, allowOutsideClick,
    allowEscapeKey, allowEnterKey, ...buttonsSettings, ...additionalSettings,
  }), [position, title, text, icon, iconColor, footer, grow, backdrop, allowOutsideClick,
    allowEscapeKey, allowEnterKey, buttonsSettings, additionalSettings]);

  const showAlert = useCallback(() => {
    if (elRef.current && !swalInstanceRef.current) {
      createAlert(elRef, swalInstanceRef, options, eventHandlers);
    }
  }, [elRef.current, options, eventHandlers]);

  useEffect(() => {
    if (swalInstanceRef.current && options) {
      updateAlert(options);
    }
  }, [swalInstanceRef.current, options]);

  component.show = () => showAlert();
  component.close = () => SweetAlert.close();

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-sweet-alert', classList) } ref={ elRef } style={ style }/>
  );
}

const createAlert = (elRef, swalRef, options, eventHandlers) => {
  const { onConfirm, onDeny, onDismiss } = eventHandlers;

  swalRef.current = SweetAlert.fire({ target: elRef.current, ...options });
  swalRef.current.then(response => {
    const { isConfirmed, isDismissed, isDenied, value, dismiss } = response;

    isConfirmed && onConfirm({ value });
    isDismissed && onDismiss({ dismiss });
    isDenied && onDeny({ value });
  }).finally(() => swalRef.current = null);
};

const updateAlert = (options) => {
  const optionsToUpdate = Object.keys(options).reduce((acc, key) => {
    return SweetAlert.isUpdatableParameter(key) ? { ...acc, [key]: options[key] } : acc;
  }, {});

  SweetAlert.update(optionsToUpdate);
};
