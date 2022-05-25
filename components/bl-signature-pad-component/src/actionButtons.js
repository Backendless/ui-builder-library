import SignaturePadButton from './signaturePadButton.js';

export default function ActionButtons(props) {
  const onClearClick = () => {
    props.signaturePad.clear();

    if (props.eventHandlers.onClearClick) {
      props.eventHandlers.onClearClick();
    }
  };

  const onUndoClick = () => {
    const data = props.signaturePad.toData();

    if (data) {
      data.pop();
      props.signaturePad.fromData(data);
    }

    if (props.eventHandlers.onUndoClick) {
      props.eventHandlers.onUndoClick();
    }
  };

  const onChangeColorClick = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const color = "rgb(" + r + "," + g + "," + b +")";

    props.signaturePad.penColor = color;

    if (props.eventHandlers.onChangeColorClick) {
      props.eventHandlers.onChangeColorClick({ color });
    }
  };

  const getDisplayProperty = (buttonName) => {
    // ТУТ ДОЛЖНО БЫТЬ BOOLEAN, А НЕ СТРОКА
    return props.component[buttonName] === 'true' ? 'inline-block' : 'none';
  };

  const savePNG = () => {
    if (props.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const dataURL = props.signaturePad.toDataURL();
      
      download(dataURL, "signature.png");
    }

    if (props.eventHandlers.onSaveClick) {
      props.eventHandlers.onSaveClick();
    }
  };

  const saveJPG = () => {
    if (props.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const dataURL = props.signaturePad.toDataURL("image/jpeg");
      
      download(dataURL, "signature.jpg");
    }

    if (props.eventHandlers.onSaveClick) {
      props.eventHandlers.onSaveClick();
    }
  };

  const saveSVG = () => {
    if (props.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const dataURL = props.signaturePad.toDataURL('image/svg+xml');

      download(dataURL, "signature.svg");
    }

    if (props.eventHandlers.onSaveClick) {
      props.eventHandlers.onSaveClick();
    }
  };

  const saveSignature = () => {
    if (props.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
      
      return;
    }

    if (props.eventHandlers.onSaveSignatureClick) {
      const dataURL = props.signaturePad.toDataURL();
      const signature = dataURLToBlob(dataURL);
      const fileName = Math.random().toString(36).slice(2, 7) + '.png';

      props.eventHandlers.onSaveSignatureClick({ signature, fileName });
    }
  };

  function download(dataURL, filename) {
    const blob = dataURLToBlob(dataURL);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }

  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  return (
    <div className="bl-customComponent-signaturePad-actionButtonsBlock">
      <div className="bl-customComponent-signaturePad-actionChangeButtons">
        <SignaturePadButton 
          onClick={onClearClick} 
          buttonsColor={props.component.buttonsColor}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.clearButtonLabel}
          buttonLabel={props.component.clearButtonLabel || 'Clear'}
        />
        <SignaturePadButton 
          onClick={onChangeColorClick}
          display={props.component.penColor ? 'none' : 'inline-block'}
          buttonsColor={props.component.buttonsColor}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.changeColorButtonLabel}
          buttonLabel={props.component.changeColorButtonLabel || 'Change color'}
        />
        <SignaturePadButton 
          onClick={onUndoClick} 
          buttonsColor={props.component.buttonsColor}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.undoButtonLabel}
          buttonLabel={props.component.undoButtonLabel || 'Undo'}
        />
      </div>
      <div className="bl-customComponent-signaturePad-actionSaveButtons">
        <SignaturePadButton 
          onClick={savePNG} 
          display={getDisplayProperty('savePNGButton')}
          buttonsColor={props.component.buttonsColor}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.savePNGButtonLabel}
          buttonLabel={props.component.savePNGButtonLabel || 'Save as PNG'}
        />
        <SignaturePadButton 
          onClick={saveJPG} 
          display={getDisplayProperty('saveJPGButton')}
          buttonsColor={props.component.buttonsColor}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.saveJPGButtonLabel}
          buttonLabel={props.component.saveJPGButtonLabel || 'Save as JPG'}
        />
        <SignaturePadButton 
          onClick={saveSVG} 
          buttonsColor={props.component.buttonsColor}
          display={getDisplayProperty('saveSVGButton')}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.saveSVGButtonLabel}
          buttonLabel={props.component.saveSVGButtonLabel || 'Save as SVG'}
        />
        <SignaturePadButton 
          onClick={saveSignature} 
          buttonsColor={props.component.buttonsColor}
          display={getDisplayProperty('saveSignatureButton')}
          // ТУТ ДОЛЖНО БЫТЬ
          // buttonLabel={component.saveSignatureButtonLabel}
          buttonLabel={props.component.saveSignatureButtonLabel || 'Save Signature'}
        />
      </div>
    </div>
  )
};
