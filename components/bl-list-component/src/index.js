import { List } from "./list";

const { cn } = BackendlessUI.CSSUtils;

export default function ListComponent({ component, eventHandlers }) {
  const { classList, width, backgroundColor, type, listItems, color, fontSize } = component;

  const onClickHandler = (e, key) => {
    e.stopPropagation();
    eventHandlers.onClickListItem({ item: key });
  };

  const props = {
    type: type && type === "ol" ? "ol" : "ul",
    color: color,
    fontSize: fontSize,
    onClickHandler: onClickHandler,
  };

  return (
    <div
      className={cn("bl-customComponent-list", classList)}
      style={{ width: width, backgroundColor: backgroundColor }}
    >
      <List props={props} items={listItems} />
    </div>
  );
}
