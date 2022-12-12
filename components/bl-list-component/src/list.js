import { ListContent } from './list-content';

export function List ({
  component, eventHandlers
}) {

  const listType = (type) => {
    if(type && type === 'ol') {
      return (
        <ol className="list">
          <ListContent
          component={component}
          eventHandlers={eventHandlers} />
        </ol>
      )
    } else {
      return (
        <ul className="list">
          <ListContent
          component={component}
          eventHandlers={eventHandlers} />
        </ul>
      )
    }
  };

  return (listType(component.type))
}
