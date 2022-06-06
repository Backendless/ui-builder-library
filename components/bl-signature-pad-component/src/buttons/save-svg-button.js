import { download } from '../utils/file';

export function SaveSVGButton({ signaturePad, component, eventHandlers }) {
  const { saveSVGButtonVisibility, saveSVGButtonLabel } = component;
  const { onSaveClick } = eventHandlers;

  const saveSVG = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = signaturePad.toDataURL('image/svg+xml');

      download(dataURL, 'signature.svg');
    }

    if (onSaveClick) {
      onSaveClick();
    }
  };

  // Waiting for BKNDLSS-28471, SHOULD BE
  // if (!saveSVGButtonVisibility) {
  //   return null;
  // }
  if (saveSVGButtonVisibility !== 'true') {
    return null;
  }

  return (
    <button
      className="save-svg-button"
      onClick={ saveSVG }
    >
      {/*Waiting for BKNDLSS-28470, SHOULD BE
      { saveSVGButtonLabel }*/}
      { saveSVGButtonLabel || 'Save as SVG' }
    </button>
  );
}
