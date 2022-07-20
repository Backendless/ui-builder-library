import { Error } from './error'
import { Success } from './success'
import { Warning } from './warning'
import { Info } from './info'

export * from './close'

export const IconsMap = {
  error  : Error,
  success: Success,
  warning: Warning,
  info   : Info,
}
