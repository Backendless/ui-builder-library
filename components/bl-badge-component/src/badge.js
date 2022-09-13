import { validate } from './index';

const BadgeForms = {
  DEFAULT  : 'roundedRectangle',
  CIRCLE   : 'circle',
  RECTANGLE: 'rectangle',
};

const BadgeRadiusMap = {
  [BadgeForms.DEFAULT]  : '25%',
  [BadgeForms.CIRCLE]   : '50%',
  [BadgeForms.RECTANGLE]: '0',
};

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

  const styles = {
    color       : badgeLabelColor,
    background  : badgeBackgroundColor,
    borderRadius: BadgeRadiusMap[badgeForm],
    fontSize    : validate(badgeFontSize),
    width       : validate(badgeWidth),
    height      : validate(badgeHeight),
  };

  if (!badgeVisibility) {
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
