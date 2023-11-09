import { useEffect, useRef } from 'react';

import SignaturePad from './lib/signature-pad.umd.min';

import { resizeCanvas } from './utils/canvas';
import { ActionButtons } from './action-buttons';

export default function SignaturePadComponent({ component, eventHandlers }) {
  const { penColor, classList, display, description, style } = component;
  const { onMouseOver, onMouseOut } = eventHandlers;
  const elRef = useRef(null);
  const signaturePadRef = useRef(null);
  const styles = {
    display: display ? 'flex' : 'none',
    ...style,
  };

  useEffect(() => {
    signaturePadRef.current = new SignaturePad(elRef.current, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor,
    });

    window.addEventListener('resize', () => {
      resizeCanvas(elRef.current, signaturePadRef.current);
    });

    resizeCanvas(elRef.current, signaturePadRef.current);
  }, []);

  useEffect(() => {
    signaturePadRef.current.penColor = penColor;
  }, [penColor]);

  return (
    <div className={ 'bl-customComponent-signature-pad ' + classList.join(' ') } style={ styles }>
      <div className="wrapper">
        <canvas ref={ elRef } onMouseOver={ onMouseOver } onMouseOut={ onMouseOut }/>
      </div>

      <div className="footer">
        <div className="description">
          { description }
        </div>

        <ActionButtons
          signaturePadRef={ signaturePadRef }
          component={ component }
          eventHandlers={ eventHandlers }
        />
      </div>
    </div>
  );
}
