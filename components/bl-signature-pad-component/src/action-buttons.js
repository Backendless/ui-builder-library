import { dataURLToBlob } from './utils/file';
import { makeSaveButton } from './utils/make-save-button';
import { ChangeColorButton, ClearButton, UndoButton } from './buttons';

export function ActionButtons({ signaturePadRef, component, eventHandlers }) {
  const { onSaveSignatureClick, onSaveClick } = eventHandlers;
  const {
    saveJPGButtonVisibility,
    saveJPGButtonLabel,
    savePNGButtonVisibility,
    savePNGButtonLabel,
    saveSVGButtonVisibility,
    saveSVGButtonLabel,
    saveSignatureButtonVisibility,
    saveSignatureButtonLabel,
  } = component;

  const SaveJPGButton = makeSaveButton({
    signaturePadRef,
    onSaveClick,
    className : 'save-jpg-button',
    visibility: saveJPGButtonVisibility,
    label     : saveJPGButtonLabel,
    type      : 'jpeg',
    extension : 'jpg',
  });

  const SavePNGButton = makeSaveButton({
    signaturePadRef,
    onSaveClick,
    className : 'save-png-button',
    visibility: savePNGButtonVisibility,
    label     : savePNGButtonLabel,
    type      : 'png',
    extension : 'png',
  });

  const SaveSVGButton = makeSaveButton({
    signaturePadRef,
    onSaveClick,
    className : 'save-svg-button',
    visibility: saveSVGButtonVisibility,
    label     : saveSVGButtonLabel,
    type      : 'svg+xml',
    extension : 'svg',
  });

  const SaveSignatureButton = makeSaveButton({
    signaturePadRef,
    className   : 'save-signature-button',
    visibility  : saveSignatureButtonVisibility,
    label       : saveSignatureButtonLabel,
    saveCallback: () => {
      if (!onSaveSignatureClick) {
        return;
      }

      const dataURL = signaturePadRef.current.toDataURL();

      dataURLToBlob(dataURL).then(signatureBlob => {
        onSaveSignatureClick({ signatureBlob });
      });
    },
  });

  return (
    <div className="action-buttons-block">
      <div className="action-change-buttons">
        <ClearButton
          signaturePadRef={ signaturePadRef }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <ChangeColorButton
          signaturePadRef={ signaturePadRef }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <UndoButton
          signaturePadRef={ signaturePadRef }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      </div>
      <div className="action-save-buttons">
        <SavePNGButton/>
        <SaveJPGButton/>
        <SaveSVGButton/>
        <SaveSignatureButton/>
      </div>
    </div>
  );
}
