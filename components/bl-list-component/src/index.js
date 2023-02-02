import { List } from "./list";

const { cn } = BackendlessUI.CSSUtils;

export default function ListComponent({ component, elRef, eventHandlers }) {
  const { classList, display, width, backgroundColor, type, listItems, color, fontSize, padding } = component;

  const items = listItems || [];

  const onClickHandler = (e, itemContent, itemChildren) => {
    e.stopPropagation();
    eventHandlers.onItemClick({ itemContent, itemChildren });
  };

  const options = {
    type: type === "ol" ? "ol" : "ul",
    style: { color, fontSize, padding },
    onClickHandler,
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn("bl-customComponent-list", classList) } style={{ width, backgroundColor }}>
      <List options={ options } items={ items } />
    </div>
  );
}
