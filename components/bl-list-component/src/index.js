import { List } from './list';

export default function ListComponent ({
  component, eventHandlers
}) {

  const { cn } = BackendlessUI.CSSUtils;
  const { style, classList, width, backgroundColor } = component;

  style.width = width;
  style.backgroundColor = backgroundColor;

  return (
    <div className={ cn('bl-customComponent-list', classList) } style={ style }>
      <List component={component}
            eventHandlers={eventHandlers}/>
    </div>
  )
}
