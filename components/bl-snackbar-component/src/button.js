export function Action({ className, onClick, children }) {
  return (
    <button className={ className } onClick={ onClick }> { children } </button>
  )
}
