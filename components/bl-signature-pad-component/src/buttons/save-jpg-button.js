import download from '../utils/download';

export default function SaveJPGButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const saveJPG = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = signaturePad.toDataURL('image/jpeg');

      download(dataURL, 'signature.jpg');
    }

    if (eventHandlers.onSaveClick) {
      eventHandlers.onSaveClick();
    }
  };

  return (
    <button
      style={{
        display: component.saveJPGButtonVisibility === 'true' ? 'inline-block' : 'none',
      }}
      onClick={ saveJPG }
    >
      {/*SHOULD BE
      { component.saveJPGButtonLabel }*/}
      { component.saveJPGButtonLabel || 'Save as JPG' }
    </button>
  );
}
