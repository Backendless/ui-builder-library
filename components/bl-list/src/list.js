export function List({ type, items, onItemClick }) {
  const ListElement = type === 'ol' ? 'ol' : 'ul';

  return (
    <ListElement className="list">
      { items.map((item, i) => (
        <Item key={ i } item={ item } listType={ item.type || type } onClick={ onItemClick } />
      )) }
    </ListElement>
  );
}

function Item({ key, item, listType, onClick }) {
  return (
    <li key={ key } className="list__item" onClick={ e => onClick(e, item) }>
      { item.content }

      { item.children && (
        <List type={ listType } items={ item.children } onItemClick={ onClick } />
      )}
    </li>
  );
}
