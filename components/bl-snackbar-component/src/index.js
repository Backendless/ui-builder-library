import { useState, useEffect, useCallback } from 'react'
import { useClasses } from './utils/useClasses'
import { Action } from './components/button'
import { IconsMap } from './utils/type'
import { Close } from './components/icons'

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
    if (autoHide) {
      if (visible) {
        setTimeout(() => {
          setVisible(false)
        }, autoHideDuration)
      }
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
        { showAction && (
          <Action
            className="action"
            onClick={ onAction }
            content={ actionContent }
          />
        ) }
        { showClose && (
          <Action
            className="close"
            onClick={ close }
            content={ Close() }
          />
        ) }
      </div>
    </div>
  )
}
