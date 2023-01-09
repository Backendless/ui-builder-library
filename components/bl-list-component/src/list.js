import { ListContent } from './list-content'

export function List ({ component, eventHandlers, children, as=component.type }) {

  const Component = as

  return (
    <Component className="list">
      <ListContent
        component={ component }
        children={ children }
        eventHandlers={ eventHandlers }
      />
    </Component>
  )
}
