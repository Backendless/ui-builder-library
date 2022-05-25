export default function SignaturePadButton(props) {
  return(
    <button
      className="bl-customComponent-signaturePad-button"
      onClick={props.onClick}
      style={{
        display: props.display,
        backgroundColor: props.buttonsColor
      }}
    >
      {props.buttonLabel}
    </button>
  )
}