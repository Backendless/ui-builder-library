import { useMemo } from 'react';

import { List } from './list';

const { cn } = BackendlessUI.CSSUtils;

export default function ListComponent ({ component, eventHandlers }) {

  const { style, classList, width, backgroundColor } = component;

  const styles = useMemo(() => ({ ...style, width, backgroundColor }), [style, width, backgroundColor]);

  return (
    <div className={ cn('bl-customComponent-list', classList) } style={ styles }>
      <List as={ component.type } component={ component } eventHandlers={ eventHandlers }/>
    </div>
  )
}
