import { List } from './list';

export default function DraggableList({ component, eventHandlers }) {
  const { title, display } = component;

  if (!display) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-draggableList ' + component.classList.join(' ') }>
      <p className="title">{ title }</p>

      <List component={ component } eventHandlers={ eventHandlers }/>
    </div>
  );
}
