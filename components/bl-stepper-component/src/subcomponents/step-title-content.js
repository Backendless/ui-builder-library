export function StepTitleContent(props) {
  const { content, titleTextClass } = props

  if (!content) {
    return null
  }

  return (
    <span className={ titleTextClass }>
      { content }
    </span>
  )
}
