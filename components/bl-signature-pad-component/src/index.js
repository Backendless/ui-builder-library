import ActionButtons from './actionButtons.js';
import SignaturePad from './leap/signature_pad.umd.min.js';

export default function MyCustomComponent({ component, eventHandlers }) {
  const elRef = React.useRef(null);
  const signaturePad = React.useRef(null);
  
  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const canvas = elRef.current;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.current.clear();
  }

  React.useEffect(() => {
    signaturePad.current = new SignaturePad(elRef.current, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: component.penColor
    });
    
    window.onresize = resizeCanvas;
    resizeCanvas();
  }, []);
  
  return (
    <div className="bl-customComponent-signaturePad">
      <div className="bl-customComponent-signaturePad-body">
        <canvas
          ref={elRef}
          className="bl-customComponent-signaturePad-canvas"
          onMouseOver={() => eventHandlers.onMouseOver()}
          onMouseOut={() => eventHandlers.onMouseOut()}
        >
        </canvas>
      </div>
      <div className="bl-customComponent-signaturePad-footer">
        <div className="bl-customComponent-signaturePad-description">
          {/*ТУТ ДОЛЖНО БЫТЬ*/}
          {/*{component.description}*/}
          {component.description || 'Sign Above'}
        </div>
        <ActionButtons
          signaturePad={signaturePad.current}
          component={component}
          eventHandlers={eventHandlers}
        />
      </div>
    </div>
  );
}
  

