import { Badge } from './badge';
import { Content } from './content';

const { cn } = BackendlessUI.CSSUtils;

export default function BadgeComponent({ component, eventHandlers }) {
  const { display, classList, padding, style } = component;

  if (!display) {
    return null;
  }

  const styles = {
    padding: validate(padding),
    ...style,
  };

  return (
    <div className={ cn(classList, 'bl-customComponent-badge') } style={ styles }>
      <Content component={ component } eventHandlers={ eventHandlers }/>
      <Badge component={ component } eventHandlers={ eventHandlers }/>
    </div>
  );
}

export function validate(dimension) {
  return String(Number(dimension)) === dimension ? dimension + 'px' : dimension;
}
