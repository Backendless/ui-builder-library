export function List({ options, items, type }) {
  const ComponentType = type || options.type;

  return (
    <ComponentType className="list">
      {items?.map((item, i) => (
        <Item listItem={item} key={i} options={options} />
      ))}
    </ComponentType>
  );
}

function Item(props) {
  const { options, listItem, key } = props;
  const { style, onClickHandler } = options;

  return (
    <li key={key} className="list__item" style={style} onClick={(e) => onClickHandler(e, listItem)}>
      {listItem.content}
      <List items={listItem.children} options={options} type={listItem.typeOfList} />
    </li>
  );
}
