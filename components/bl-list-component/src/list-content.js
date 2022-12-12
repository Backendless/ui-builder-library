export function ListContent({
  component, eventHandlers
}) {

  const itemStyles = {
    color   : component.color,
    fontSize: component.fontSize
  };

  const onItemClick = (key) => {
    eventHandlers.onClickListItem({item: key})
  }

  const listItems = (component.listItems || []).map((item, i) =>
    <li key={i.toString()}
        className="list__item"
        style = {itemStyles}
        onClick={() => onItemClick(item)}
    >
      {item}
    </li>
  );

  return (listItems)
}
