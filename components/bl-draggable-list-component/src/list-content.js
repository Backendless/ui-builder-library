import { ListItem } from './list-item';

export function ListContent({ data, onDragStart, onDragEnd, onDragOver, component, onDelete, eventHandlers }) {
  if (!data.length) {
    return (
      <li className="empty">Empty</li>
    );
  }

  return (
    data.map((item, index) => (
        <ListItem
          key={ item.uid }
          item={ item }
          index={ index }
          onDragStart={ onDragStart }
          onDragEnd={ onDragEnd }
          onDragOver={ onDragOver }
          component={ component }
          onDelete={ onDelete }
          eventHandlers={ eventHandlers }
        />
      )
    )
  );
}
