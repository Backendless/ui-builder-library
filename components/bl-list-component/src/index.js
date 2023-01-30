import { useEffect, useRef } from "react";

import { List } from "./list";

const { cn } = BackendlessUI.CSSUtils;

export default function ListComponent({ component, eventHandlers }) {
  const { classList, display, width, backgroundColor, type, listItems, color, fontSize, padding } = component;

  const items = listItems || [];

  const onClickHandler = (e, itemContent, itemChildren) => {
    e.stopPropagation();
    eventHandlers.onClickListItem({ itemContent, itemChildren });
  };

  const options = {
    type: type && type === "ol" ? "ol" : "ul",
    style: { color, fontSize, padding },
    onClickHandler: onClickHandler,
  };

  const listRef = useRef();

  useEffect(() => {
    component.el = listRef.current;
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ listRef } className={ cn("bl-customComponent-list", classList) } style={{ width, backgroundColor }}>
      <List options={ options } items={ items } />
    </div>
  );
}
