import { download } from '../utils/file';

export function SaveJPGButton({ signaturePad, component, eventHandlers }) {
  const { saveJPGButtonVisibility, saveJPGButtonLabel } = component;
  const { onSaveClick } = eventHandlers;

  const saveJPG = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = signaturePad.toDataURL('image/jpeg');

      download(dataURL, 'signature.jpg');
    }

    if (onSaveClick) {
      onSaveClick();
    }
  };
  
  // Waiting for BKNDLSS-28471, SHOULD BE
  // if (!saveJPGButtonVisibility) {
  //   return null;
  // }
  if (saveJPGButtonVisibility !== 'true') {
    return null;
  }

  return (
    <button
      className="save-jpg-button"
      onClick={ saveJPG }
    >
      {/*Waiting for BKNDLSS-28470, SHOULD BE
      { saveJPGButtonLabel }*/}
      { saveJPGButtonLabel || 'Save as JPG' }
    </button>
  );
}
