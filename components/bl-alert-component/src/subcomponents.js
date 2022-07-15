import IconsMap from './icons'

export const AlertButton = (props) => {
  const { onCloseButton, variant } = props

  return (
    <div className="button-container">
      <button onClick={ onCloseButton } className="alert__close-button" type="button">
        <svg className={ `${ variant }__close-button-icon` } focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
    </div>
  )
}

export const AlertTitle = (props) => {
  const { title, classesTitle } = props

  return (
    <span className={ classesTitle }>
      { title }
    </span>
  )
}

export const AlertIcon = (props) => {
  const { typeAlert, variant } = props

  const Icon = IconsMap[typeAlert]

  return <Icon variant={ variant }/>
}
