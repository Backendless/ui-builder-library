import { useEffect, useRef } from 'react';

import { useCloseEvents, useDrawerActions, useDrawerStyles } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function DrawerComponent({ component, eventHandlers, pods, elRef }) {
  const { classList, display, style, controlVisibility, controlLabel } = component;

  const drawerContentRef = useRef(null);
  const drawerContainerRef = useRef(null);

  const {
    visibility, openContent, closeContent,
  } = useDrawerActions(component, eventHandlers, drawerContentRef, drawerContainerRef);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-drawer', classList) } style={ style }>
      { controlVisibility && (
        <button type="button" aria-label="open backdrop menu" onClick={ openContent }>{ controlLabel }</button>
      ) }
      { visibility && ReactDOM.createPortal((
        <Drawer
          component={ component }
          pods={ pods }
          closeContent={ closeContent }
          drawerContentRef={ drawerContentRef }
          drawerContainerRef={ drawerContainerRef }
        />
      ), document.body) }
    </div>
  );
}

function Drawer(props) {
  const { component, pods, closeContent, drawerContentRef, drawerContainerRef } = props;
  const { backdropVisibility } = component;

  const { containerStyles, contentStyles } = useDrawerStyles(component);

  useCloseEvents(drawerContentRef, closeContent, component);

  useEffect(() => {
    drawerContentRef.current.style.transform = 'translate(0px, 0px)';

    if (backdropVisibility) {
      drawerContainerRef.current.classList.add('backdrop');
    }
  }, []);

  return (
    <div ref={ drawerContainerRef } className="bl-customComponent-drawer-container" style={ containerStyles }>
      <div ref={ drawerContentRef } className="drawer-content" style={ contentStyles }>
        { pods['Drawer Content'].render() }
      </div>
    </div>
  );
}
