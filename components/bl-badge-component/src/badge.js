import { useMemo } from 'react';

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
  
  const badgeForms = {
    DEFAULT: 'default',
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
  };

  const badgeRadiusMap = {
    [badgeForms.DEFAULT]: '25%',
    [badgeForms.RECTANGLE]: '0',
    [badgeForms.CIRCLE]: '50%',
  };

  const styles = useMemo(() => ({
    color: badgeLabelColor,
    background: badgeBackgroundColor,
    borderRadius: badgeRadiusMap[badgeForm],
    fontSize: badgeFontSize,
    width: badgeWidth,
    height: badgeHeight,
  }), []);

  // Waiting for BKNDLSS-28471, SHOULD BE
  // if (!badgeVisibility) {
  //   return null;
  // }
  if (badgeVisibility !== 'true') {
    return null;
  }

  return (
    <div
      className={ 'badge ' + badgeAlignment }
      style={ styles }
      onClick={ onBadgeClick }
      onMouseOver={ onBadgeMouseOver }
      onMouseOut={ onBadgeMouseOut }>
        { badgeLabel }
    </div>
  );
}
