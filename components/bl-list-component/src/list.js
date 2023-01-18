export function List({ options, items }) {
  const ComponentType = options.type;

  return (
    <ComponentType className="list">
      {items?.map((item, i) => (
        <Item item={item} key={i} options={options} />
      ))}
    </ComponentType>
  );
}

function Item(props) {
  const { options, item, key } = props;
  const { style, onClickHandler } = options;

  return (
    <li key={key} className="list__item" style={style} onClick={(e) => onClickHandler(e, item)}>
      {item.content}
      {item.children && <List items={item.children} options={options} />}
    </li>
  );
}
