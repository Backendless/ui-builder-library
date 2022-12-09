export function ListContent({
  component, eventHandlers, appData, pageData, parentDataModel, pods, settings, definition, instanceId
}) {
  
  const onClickItemHandler = (key) => {
    eventHandlers.onClickListItem({item: key})
  }
  
  const listItems = (component.listItems || []).map((item, i) =>
    <li key={i.toString()}
        onClick={() => onClickItemHandler(item)}
    >
      {item}
    </li>
  );

  return (listItems)
}