import { List } from './list';

export default function ListBlockComponent ({
  component, eventHandlers, appData, pageData, parentDataModel, pods, settings, definition, instanceId
}) {

  return ( 
    <div> 
      <List component={component}
            eventHandlers={eventHandlers}/> 
    </div>
  )
}