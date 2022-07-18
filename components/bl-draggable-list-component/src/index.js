import { List } from './list';

export default function DraggableList({ component, eventHandlers }) {
  const { title, visibility, display } = component;

  if (!visibility || !display) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-draggableList ' + component.classList.join(' ') }>
      <p className="title">{ title }</p>

      <List component={ component } eventHandlers={ eventHandlers }/>
    </div>
  );
}
