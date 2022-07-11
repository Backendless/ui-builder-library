export const Action = ({ className, onClick, content }) => {
  return (
    <button
      className={ className }
      onClick={ onClick }>
      { content }
    </button>
  )
}
