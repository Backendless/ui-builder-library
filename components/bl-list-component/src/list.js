import { ListContent } from './list-content';

export function List ({
  component, eventHandlers, child
}) {

  const listType = (type) => {
    if(type && type === 'ol') {
      return (
        <ol className="list">
          <ListContent
          component={component}
          child={child}
          eventHandlers={eventHandlers} />
        </ol>
      )
    } else {
      return (
        <ul className="list">
          <ListContent
          component={component}
          child={child}
          eventHandlers={eventHandlers} />
        </ul>
      )
    }
  };

  return (listType(component.type))
}
