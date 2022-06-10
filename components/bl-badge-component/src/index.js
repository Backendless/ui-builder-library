import { Badge } from './badge';
import { Content } from './content';

export default function BadgeComponent({ component, eventHandlers }) {
  const { display, classList, padding } = component;
  
  if (!display) {
    return null;
  }

  return (
    <div
      className={ 'bl-customComponent-badge ' + classList.join(' ') }
      style={{
        padding: padding+'px',
      }}
    >
      <Content component={ component } eventHandlers={ eventHandlers }/>
      <Badge component={ component } eventHandlers={ eventHandlers }/>
    </div>
  );
}
