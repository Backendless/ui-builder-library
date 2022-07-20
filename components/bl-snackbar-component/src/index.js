import { useState, useEffect, useCallback } from 'react'
import { useClasses } from './use-classes'
import { Action } from './button'
import { CloseIcon, IconsMap } from './icons'

const DEFAULT_HIDE_DURATION = 5000

export default function SnackbarComponent({ component, eventHandlers }) {
  const [visible, setVisible] = useState(false)

  component.visibility = (show) => {
    setVisible(show)
  }

  const {
    snackContent,
    autoHide,
    autoHideDuration,
    horizontalPosition,
    verticalPosition,
    type,
    showClose,
    showAction,
    actionContent,
  } = component

  const {
    onClose,
    onAction,
  } = eventHandlers

  const classes = useClasses(horizontalPosition, verticalPosition, type, visible)

  const Icon = IconsMap[type]

  useEffect(() => {
    if (autoHide && visible) {
      setTimeout(() => {
        setVisible(false)
      }, autoHideDuration || DEFAULT_HIDE_DURATION)
    }
  }, [visible])

  const close = useCallback(() => {
    setVisible(false)
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <div className={ classes }>
      <div className="text">
        { Icon && (
          <Icon/>
        ) }
        <div className="content">
          { snackContent }
        </div>
      </div>
      <div className="buttons">
        { showAction && (<Action className="action" onClick={ onAction }> { actionContent } </Action>) }
        { showClose && (<Action className="close" onClick={ close }> { CloseIcon() } </Action>) }
      </div>
    </div>
  )
}
