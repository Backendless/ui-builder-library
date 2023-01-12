import { List } from "./list";

export function ListContent({ props, items }) {
  return (items || []).map((item, i) => (
    <li
      key={i}
      className="list__item"
      style={{ color: props.color, fontSize: props.fontSize }}
      onClick={(e) => props.onClickHandler(e, item)}
    >
      {item.content}
      {item.children && <List props={props} items={item.children} />}
    </li>
  ));
}
