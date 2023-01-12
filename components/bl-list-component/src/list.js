import { ListContent } from "./list-content";

export function List({ props, items }) {
  const ComponentType = props.type;

  return (
    <ComponentType className="list">
      <ListContent props={props} items={items} />
    </ComponentType>
  );
}
