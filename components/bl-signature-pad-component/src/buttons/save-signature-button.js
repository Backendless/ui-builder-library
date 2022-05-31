import dataURLToBlob from '../utils/data-url-to-blob';

export default function SaveSignatureButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const saveSignature = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');

      return;
    }

    if (eventHandlers.onSaveSignatureClick) {
      const dataURL = signaturePad.toDataURL();
      const signatureBlob = dataURLToBlob(dataURL);

      eventHandlers.onSaveSignatureClick({ signatureBlob });
    }
  };

  return (
    <button
      style={{
        display: component.saveSignatureButtonVisibility === 'true' ? 'inline-block' : 'none',
      }}
      onClick={ saveSignature }
    >
      {/*SHOULD BE
      { component.saveSignatureButtonLabel }*/}
      { component.saveSignatureButtonLabel || 'Save Signature' }
    </button>
  );
}
