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

export default function SpoilerEffectComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, effect, background, applyEffect } = component;
  const { onClick, onMouseEnter, onMouseMove, onMouseLeave } = eventHandlers;

  const [isApplied, setIsApplied] = useState(applyEffect);

  const onClickHandler = useCallback(() => {
    setIsApplied((prevState) => !prevState);
    onClick();
  }, []);

  component.applySpoiler = () => setIsApplied(true);
  component.removeSpoiler = () => setIsApplied(false);

  const Effect = EffectViews[effect];

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-spoiler-effect', classList) }
      ref={ elRef }
      style={ style }
      onClick={ onClickHandler }
      onMouseEnter={ onMouseEnter }
      onMouseMove={ onMouseMove }
      onMouseLeave={ onMouseLeave }>

      <div
        className={ cn('spoiler-effect-content', { blurred: isApplied }) }
        style={{ filter: isApplied ? `url(#filter-${ effect })` : 'none' }}>
        { pods.spoilerEffectContent.render() }
      </div>

      { isApplied && (
        <svg className="svg" style={{ opacity: effect === EffectTypes.MORPHOLOGY ? OPACITY : undefined }}>
          <Effect fill={ background }/>
        </svg>
      ) }
    </div>
  );
}
