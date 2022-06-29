import { List } from './draggable-list/list';

export default function DraggableList({ component, eventHandlers }) {
  const { title, draggableListVisibility } = component;

  if (!draggableListVisibility) {
    return null;
  }

  return (
    <div className={"bl-customComponent-draggableList " + component.classList.join(' ')}>
      <p className="title">{ title }</p>
      <List
        component={ component }
        eventHandlers={ eventHandlers }
      />
    </div>
  );
}
