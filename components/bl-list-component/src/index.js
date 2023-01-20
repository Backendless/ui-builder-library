import { useRef } from "react";

import { List } from "./list";

const { cn } = BackendlessUI.CSSUtils;

export default function ListComponent({ component, eventHandlers }) {
  const { classList, width, backgroundColor, type, listItems, color, fontSize, padding } = component;

  const onClickHandler = (e, key) => {
    e.stopPropagation();
    eventHandlers.onClickListItem({ item: key });
  };

  const options = {
    type: type && type === "ol" ? "ol" : "ul",
    style: {
      color,
      fontSize,
      padding,
    },
    onClickHandler: onClickHandler,
  };

  const listRef = useRef();

  component.el = listRef.current;

  return (
    <div ref={listRef} className={cn("bl-customComponent-list", classList)} style={{ width, backgroundColor }}>
      <List options={options} items={listItems} />
    </div>
  );
}
