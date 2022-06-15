import { useEffect, useRef } from 'react';

import SignaturePad from './lib/signature-pad.umd.min';
import { resizeCanvas } from './utils/canvas';
import { ActionButtons } from './action-buttons';

export default function SignaturePadComponent({ component, eventHandlers }) {
  const { penColor, classList, display, description } = component;
  const { onMouseOver, onMouseOut } = eventHandlers;
  const elRef = useRef(null);
  const signaturePad = useRef(null);

  useEffect(() => {
    signaturePad.current = new SignaturePad(elRef.current, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor,
    });

    window.addEventListener('resize', () => {
      resizeCanvas(elRef.current, signaturePad.current);
    });

    resizeCanvas(elRef.current, signaturePad.current);
  }, []);

  return (
    <div
      className={ 'bl-customComponent-signature-pad ' + classList.join(' ') }
      style={{
        display: display ? 'flex' : 'none',
      }}
    >
      <div className="wrapper">
        <canvas
          ref={ elRef }
          onMouseOver={ onMouseOver }
          onMouseOut={ onMouseOut }
        >
        </canvas>
      </div>
      <div className="footer">
        <div className="description">
          { description }
        </div>
        <ActionButtons
          signaturePad={ signaturePad.current }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      </div>
    </div>
  );
}
