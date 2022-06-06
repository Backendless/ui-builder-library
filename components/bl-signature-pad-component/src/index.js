import SignaturePad from './lib/signature-pad.umd.min';
import { ActionButtons } from './action-buttons';

export default function MyCustomComponent({ component, eventHandlers }) {
  const { penColor, classList, display, description } = component;
  const { onMouseOver, onMouseOut } = eventHandlers;
  const elRef = React.useRef(null);
  const signaturePad = React.useRef(null);

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const canvas = elRef.current;

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);

    signaturePad.current.clear();
  }

  React.useEffect(() => {
    signaturePad.current = new SignaturePad(elRef.current, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor,
    });

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
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
          {/*Waiting for BKNDLSS-28470, SHOULD BE
          { description }*/}
          { description || 'Sign Above' }
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
