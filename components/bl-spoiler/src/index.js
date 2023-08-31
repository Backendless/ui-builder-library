import { useCallback, useState } from 'react';
import { Blur, Morphology, Morphose, Music, Ripples, Smoke, Snow, Turbulence } from './effects';

const { cn } = BackendlessUI.CSSUtils;

const EffectTypes = {
  BLUR      : 'blur',
  MORPHOLOGY: 'morphology',
  MORPHOSE  : 'morphose',
  MUSIC     : 'music',
  RIPPLES   : 'ripples',
  SMOKE     : 'smoke',
  SNOW      : 'snow',
  TURBULENCE: 'turbulence',
};

const EffectViews = {
  [EffectTypes.BLUR]      : Blur,
  [EffectTypes.MORPHOLOGY]: Morphology,
  [EffectTypes.MORPHOSE]  : Morphose,
  [EffectTypes.MUSIC]     : Music,
  [EffectTypes.RIPPLES]   : Ripples,
  [EffectTypes.SMOKE]     : Smoke,
  [EffectTypes.SNOW]      : Snow,
  [EffectTypes.TURBULENCE]: Turbulence,
};

const OPACITY = 0.5;

export default function SpoilerComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, effect, background, enabled } = component;
  const { onClick, onMouseEnter, onMouseLeave } = eventHandlers;

  const [isEnabled, setIsEnabled] = useState(enabled);

  const onClickHandler = useCallback((event) => {
    onClick({ event, isEnabled });
  }, [isEnabled]);

  component.enableSpoiler = () => setIsEnabled(true);
  component.disableSpoiler = () => setIsEnabled(false);
  component.toggleSpoiler = (state) => {
    if (state !== undefined) {
      setIsEnabled(state);
    } else {
      setIsEnabled(v => !v);
    }
  };

  const Effect = EffectViews[effect];

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-spoiler', classList) }
      ref={ elRef }
      style={ style }
      onClick={ onClickHandler }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }>

      <div className="spoiler-content" style={{ filter: isEnabled ? `url(#filter-${ effect })` : 'none' }}>
        { pods.spoilerContent.render() }
      </div>

      { isEnabled && (
        <svg className="svg" style={{ opacity: effect === EffectTypes.MORPHOLOGY ? OPACITY : undefined }}>
          <Effect fill={ background }/>
        </svg>
      ) }
    </div>
  );
}
