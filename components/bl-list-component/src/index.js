import { List } from './list';

const { cn } = BackendlessUI.CSSUtils;

export default function ListComponent({ component, elRef, eventHandlers }) {
  const { classList, style, display, type, listItems } = component;

  const items = listItems || [];

  const onItemClick = (event, item) => {
    event.stopPropagation();
    eventHandlers.onItemClick({ event, item });
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-list', ...classList) } style={ style }>
      <List type={ type } items={ items } onItemClick={ onItemClick } />
    </div>
  );
}
