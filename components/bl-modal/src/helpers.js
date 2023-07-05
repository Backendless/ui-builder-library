import { useEffect } from 'react';

const ESCAPE_KEY_CODE = 27;

export function useModalContentStyles({ contentWidth, contentHeight }) {
  return useMemo(() => ({
    width : normalizeDimensionValue(contentWidth),
    height: normalizeDimensionValue(contentHeight)
  }), [contentWidth, contentHeight]);
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
