import { List } from './list';

export default function DraggableList({ component, eventHandlers }) {
  const { title, display, style } = component;

  if (!display) {
    return null;
  }

  return (
    <div className={ 'bl-customComponent-draggableList ' + component.classList.join(' ') } style={ style }>
      <p className="title">{ title }</p>

      <List component={ component } eventHandlers={ eventHandlers }/>
    </div>
  );
}
