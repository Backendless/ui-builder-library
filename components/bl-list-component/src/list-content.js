import { List } from './list';

export function ListContent({
  component, eventHandlers, child}) {

  const { color, fontSize, listItems, type} = component;

  const itemStyles = {
    color   : color,
    fontSize: fontSize
  };

  const onItemClick = (key) => {
    eventHandlers.onClickListItem({item: key});
  }

 const getItems = (items) => {
    return (items || []).map((item, i) => {
      if (item.child && item.child.length !== 0) {
          return (
            <li key={i.toString()}
              className="list__item"
              style = {itemStyles}
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(item.item);
              }}
            >
              {item.item}
              <List component={component}
                    child={item.child}
                    eventHandlers={eventHandlers}/>
            </li>
          )
      } else {
        return (
          <li key={i.toString()}
            className="list__item"
            style = {itemStyles}
            onClick={(e) => {
              e.stopPropagation();
              onItemClick(item.item);
            }}
          >
            {item.item}
          </li>
        )
      }
    });
  }

  return (getItems(child || listItems))
}
