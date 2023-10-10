import { Error } from './error';
import { Info } from './info';
import { Success } from './success';
import { Warning } from './warning';

export * from './close';

export const IconsMap = {
  error  : Error,
  success: Success,
  warning: Warning,
  info   : Info,
};
