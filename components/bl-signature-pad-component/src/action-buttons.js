import {
  ChangeColorButton,
  ClearButton,
  SaveJPGButton,
  SavePNGButton,
  SaveSignatureButton,
  SaveSVGButton,
  UndoButton,
} from './buttons';

export function ActionButtons(props) {
  const { signaturePad, component, eventHandlers } = props;

  return (
    <div className="action-buttons-block">
      <div className="action-change-buttons">
        <ClearButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <ChangeColorButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <UndoButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      </div>
      <div className="action-save-buttons">
        <SavePNGButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <SaveJPGButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <SaveSVGButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
        <SaveSignatureButton
          signaturePad={ signaturePad }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      </div>
    </div>
  );
}
