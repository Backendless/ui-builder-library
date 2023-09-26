import { Action } from './button';
import { CloseIcon, IconsMap } from './icons';

export function Snackbar({ showClose, showAction, actionContent, snackContent, type, onAction, onClose, id, outline }) {
  const Icon = IconsMap[type];
  return (
    <div className={ `message message_${ type }` } style={{ border: !outline && 'none' }}>
      <div className="text">
        { Icon && (<Icon/>) }
        <div className="content">{ snackContent }</div>
      </div>
      <div className="buttons">
        { showAction && actionContent && (<Action className="action" onClick={ onAction }>{ actionContent }</Action>) }
        { showClose && (<Action className="close" onClick={ () => onClose(id) }><CloseIcon/></Action>) }
      </div>
    </div>
  );
}
