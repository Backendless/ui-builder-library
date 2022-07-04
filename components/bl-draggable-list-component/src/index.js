import { List } from './draggable-list/index';

export default function DraggableList({ component, eventHandlers }) {
  const { title, draggableListVisibility, display } = component;

  if (!draggableListVisibility || !display) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-draggableList ' + component.classList.join(' ') }>
      <p className="title">{ title }</p>
      <List
        component={ component }
        eventHandlers={ eventHandlers }
      />
    </div>
  );
}
