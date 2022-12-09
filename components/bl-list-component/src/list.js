import { ListContent } from './list-content';

export function List ({
  component, eventHandlers, appData, pageData, parentDataModel, pods, settings, definition, instanceId
}) {
  
  const listType = (type) => {
    if(type && type === 'ol') {
      return (
        <ol>
          <ListContent 
          component={component}
          eventHandlers={eventHandlers} />
        </ol>
      )
    } else {
      return (
        <ul>
          <ListContent 
          component={component}
          eventHandlers={eventHandlers} />
        </ul>
      )
    }
  };

  return (listType(component.type))
}