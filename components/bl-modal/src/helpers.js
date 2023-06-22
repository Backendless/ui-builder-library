import { useEffect, useMemo } from 'react';

const { normalizeDimensionValue } = BackendlessUI.CSSUtils;

const ESCAPE_KEY_CODE = 27;

export function useStyles({ style, backdropWidth, backdropHeight }) {
  return useMemo(() => ({
    ...style,
    width : normalizeDimensionValue(backdropWidth),
    height: normalizeDimensionValue(backdropHeight)
  }), [style, backdropWidth, backdropHeight]);
};

export function useCloseOnEscape({ onClose, visibility, setVisibility, closeOnEscape }) {
  useEffect(() => {
    const handleEscClick = e => {
      if (visibility && closeOnEscape && e.keyCode === ESCAPE_KEY_CODE) {
        setVisibility(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, [visibility, closeOnEscape]);
};
