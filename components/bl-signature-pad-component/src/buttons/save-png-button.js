import { download } from '../utils/file';

export function SavePNGButton({ signaturePad, component, eventHandlers }) {
  const { savePNGButtonVisibility, savePNGButtonLabel } = component;
  const { onSaveClick } = eventHandlers;

  const savePNG = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = signaturePad.toDataURL();

      download(dataURL, 'signature.png');
    }

    if (onSaveClick) {
      onSaveClick();
    }
  };

  // Waiting for BKNDLSS-28471, SHOULD BE
  // if (!savePNGButtonVisibility) {
  //   return null;
  // }
  if (savePNGButtonVisibility !== 'true') {
    return null;
  }

  return (
    <button
      className="save-png-button"
      onClick={ savePNG }
    >
      { savePNGButtonLabel }
    </button>
  );
}
