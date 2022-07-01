import { useState, useEffect, useCallback } from 'react'
import { useClasses } from './utils/useClasses'
import { Action } from './components/button'
import { getHorizontal, getVertical } from './utils/position'
import { IconsMap } from './utils/type'

export default function Snackbar({ component, eventHandlers }) {
  const [visible, setVisible] = useState(false)
  const [classes, addClasses, removeClasses] = useClasses('bl-customComponent-snackbar')

  const {
    snackContent,
    autoHide,
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

  const Icon = IconsMap[type]

  useEffect(() => {
    const horizontal = getHorizontal(horizontalPosition)
    const vertical = getVertical(verticalPosition)
    addClasses(horizontal + vertical)

    if (type) {
      addClasses(`bl-customComponent-snackbar_${ type }`)
    }
  }, [])

  useEffect(() => {
    if (component.show) {
      setVisible(true)
      component.show = false
    }
  }, [component.show])

  useEffect(() => {
    if (visible) {
      addClasses('bl-customComponent-snackbar_show')
    } else {
      removeClasses('bl-customComponent-snackbar_show')
    }

    if (autoHide > 0) {
      if (visible) {
        setTimeout(() => {
          setVisible(false)
        }, autoHide)
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
        {
          Icon && (
            <Icon/>
          )
        }
        { snackContent }
      </div>
      <div>
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
            content="X"
          />
        ) }
      </div>
    </div>
  )
}
