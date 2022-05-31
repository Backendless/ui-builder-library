import download from '../utils/download';

export default function SaveSVGButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const saveSVG = () => {
    if (signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = signaturePad.toDataURL('image/svg+xml');

      download(dataURL, 'signature.svg');
    }

    if (eventHandlers.onSaveClick) {
      eventHandlers.onSaveClick();
    }
  };

  return (
    <button
      style={{
        display: component.saveSVGButtonVisibility === 'true' ? 'inline-block' : 'none',
      }}
      onClick={ saveSVG }
    >
      {/*SHOULD BE
      { component.saveSVGButtonLabel }*/}
      { component.saveSVGButtonLabel || 'Save as SVG' }
    </button>
  );
}
