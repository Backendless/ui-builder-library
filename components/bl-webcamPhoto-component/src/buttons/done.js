export function DoneButton({ onClick, text, disabled }){
  
  return (
      <button 
        className="done-button" 
        onClick={ onClick }
        disabled={ disabled }>
        {text}
      </button>
    )
}