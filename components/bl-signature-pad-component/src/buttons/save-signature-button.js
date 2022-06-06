import { dataURLToBlob } from '../utils/file';

export function SaveSignatureButton({ signaturePad, component, eventHandlers }) {
  const { saveSignatureButtonVisibility, saveSignatureButtonLabel } = component;
  const { onSaveSignatureClick } = eventHandlers;

  const saveSignature = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');

      return;
    }

    if (onSaveSignatureClick) {
      const dataURL = signaturePad.toDataURL();
      const signatureBlob = dataURLToBlob(dataURL);

      onSaveSignatureClick({ signatureBlob });
    }
  };

  // Waiting for BKNDLSS-28471, SHOULD BE
  // if (!saveSignatureButtonVisibility) {
  //   return null;
  // }
  if (saveSignatureButtonVisibility !== 'true') {
    return null;
  }

  return (
    <button
      className="save-signature-button"
      onClick={ saveSignature }
    >
      {/*Waiting for BKNDLSS-28470, SHOULD BE
      { saveSignatureButtonLabel }*/}
      { saveSignatureButtonLabel || 'Save Signature' }
    </button>
  );
}
