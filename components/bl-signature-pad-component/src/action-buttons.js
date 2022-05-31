import ChangeColorButton from './buttons/change-color-button';
import ClearButton from './buttons/clear-button';
import SaveJPGButton from './buttons/save-jpg-button';
import SavePNGButton from './buttons/save-png-button';
import SaveSignatureButton from './buttons/save-signature-button';
import SaveSVGButton from './buttons/save-svg-button';
import UndoButton from './buttons/undo-button';

export default function ActionButtons(props) {
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
