import { Badge } from './badge';
import { Content } from './content';

const { cn } = BackendlessUI.CSSUtils;

export default function BadgeComponent({ component, eventHandlers }) {
  const { display, classList, padding, style } = component;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn(classList, 'bl-customComponent-badge') } style={{ padding, ...style }}>
      <Content component={ component } eventHandlers={ eventHandlers }/>
      <Badge component={ component } eventHandlers={ eventHandlers }/>
    </div>
  );
}
