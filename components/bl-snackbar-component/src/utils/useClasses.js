import { useState } from 'react'

export const useClasses = (initialValue) => {
  const [classes, setClasses] = useState(initialValue)

  const addClasses = (value) => {
    setClasses(prev => prev + ' ' + value)
  }

  const removeClasses = (value) => {
    setClasses(prev => prev.replace(value, ''))
  }

  return [classes, addClasses, removeClasses]
}
