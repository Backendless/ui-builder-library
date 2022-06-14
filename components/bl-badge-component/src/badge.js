export function Badge({ component, eventHandlers }) {
  const { onBadgeClick, onBadgeMouseOver, onBadgeMouseOut } = eventHandlers;
  const {
    badgeVisibility,
    badgeLabel,
    badgeFontSize,
    badgeForm,
    badgeAlignment,
    badgeLabelColor,
    badgeBackgroundColor,
    badgeWidth,
    badgeHeight,
  } = component;
  
  // Waiting for BKNDLSS-28471, SHOULD BE
  // if (!badgeVisibility) {
  //   return null;
  // }
  if (badgeVisibility !== 'true') {
    return null;
  }
  
  const badgeStyles = {
    color: badgeLabelColor,
    background: badgeBackgroundColor,
    borderRadius: '25%',
    fontSize: badgeFontSize+'px',
    width: badgeWidth+'px',
    height: badgeHeight+'px',
  };
  
  if (badgeForm === 'circle') {
    badgeStyles.borderRadius = '50%';
  } else if (badgeForm === 'rectangle') {
    badgeStyles.borderRadius = '0';
  } 

  return (
    <div
      className={ 'badge ' + badgeAlignment }
      style={ badgeStyles }
      onClick={ onBadgeClick }
      onMouseOver={ onBadgeMouseOver }
      onMouseOut={ onBadgeMouseOut }
    >{ badgeLabel }</div>
  );
}
