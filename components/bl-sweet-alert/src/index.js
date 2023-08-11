import { useCallback, useEffect, useMemo, useRef } from 'react';
import Swal from './lib/sweetalert2';

const { cn } = BackendlessUI.CSSUtils;

export default function SweetAlertComponent({ component, eventHandlers, elRef }) {
  const {
    style, classList, display, position, title, text, icon, iconColor, footer, grow, backdrop,
    allowOutsideClick, allowEscapeKey, allowEnterKey, buttonsSettings, additionalSettings,
  } = component;

  const { onConfirm, onDeny, onDismiss } = eventHandlers;

  const swalInstanceRef = useRef(null);

  const options = useMemo(() => ({
    position, title, text, icon, iconColor, footer, grow, backdrop, allowOutsideClick,
    allowEscapeKey, allowEnterKey, ...buttonsSettings, ...additionalSettings,
  }), [position, title, text, icon, iconColor, footer, grow, backdrop, allowOutsideClick,
    allowEscapeKey, allowEnterKey, buttonsSettings, additionalSettings]);

  const showAlert = useCallback(() => {
    if (elRef.current && !swalInstanceRef.current) {
      swalInstanceRef.current = createAlert({ target: elRef.current, ...options });
      swalInstanceRef.current.then((response) => {
        if (response.isConfirmed && onConfirm) {
          onConfirm({ response });
        }

        if (response.isDismissed && onDismiss) {
          onDismiss({ response });
        }

        if (response.isDenied && onDeny) {
          onDeny({ response });
        }
      }).finally(() => swalInstanceRef.current = null);
    }
  }, [elRef.current, options, onConfirm, onDismiss, onDeny]);

  useEffect(() => {
    if (swalInstanceRef.current) {
      updateAlert(swalInstanceRef, options);
    }
  }, [swalInstanceRef.current, options]);

  component.show = () => showAlert();
  component.close = () => Swal.close();

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-sweet-alert', classList) } ref={ elRef } style={ style } />
  );
}

const createAlert = (options) => Swal.fire(options);

const updateAlert = (swalRef, options) => {
  if (swalRef.current && options) {
    const updateOptions = Object.keys(options).reduce((acc, key) => {
      if (Swal.isUpdatableParameter(key)) {
        acc[key] = options[key];
      }

      return acc;
    }, {});

    swalRef.current.update({ ...updateOptions });
  }
};
