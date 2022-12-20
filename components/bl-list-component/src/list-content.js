import { List } from './list';

export function ListContent({ component, eventHandlers, children }) {

  const { color, fontSize, listItems } = component;

  const onItemClick = (e, key) => {
    e.stopPropagation();
    eventHandlers.onClickListItem({ item: key });
  }

  return (children || listItems || []).map((item, i) => (
    <li
      key={ i }
      className="list__item"
      style={{ color: color, fontSize: fontSize }}
      onClick={ (e) => onItemClick(e, item) }
    >
      { item.content }
      { item.children && (
        <List
          component={ component }
          children={ item.children }
          eventHandlers={ eventHandlers }
        />
      ) }
    </li>
  ));
}
