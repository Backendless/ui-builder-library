import download from '../utils/download';

export default function SavePNGButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const savePNG = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = signaturePad.toDataURL();

      download(dataURL, 'signature.png');
    }

    if (eventHandlers.onSaveClick) {
      eventHandlers.onSaveClick();
    }
  };

  return (
    <button
      style={{
        display: component.savePNGButtonVisibility === 'true' ? 'inline-block' : 'none',
      }}
      onClick={ savePNG }
    >
      {/*SHOULD BE
      { component.savePNGButtonLabel }*/}
      { component.savePNGButtonLabel || 'Save as PNG' }
    </button>
  );
}
