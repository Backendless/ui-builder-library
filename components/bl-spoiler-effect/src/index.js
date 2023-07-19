import { useCallback, useEffect, useRef, useState } from 'react';

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
  [EffectTypes.BLUR]      : BlurEffect,
  [EffectTypes.MORPHOLOGY]: MorphologyEffect,
  [EffectTypes.MORPHOSE]  : MorphoseEffect,
  [EffectTypes.MUSIC]     : MusicEffect,
  [EffectTypes.RIPPLES]   : RipplesEffect,
  [EffectTypes.SMOKE]     : SmokeEffect,
  [EffectTypes.SNOW]      : SnowEffect,
  [EffectTypes.TURBULENCE]: TurbulenceEffect,
};
const DefaultValues = {
  OPACITY       : 0.5,
  BASE_FREQUENCY: 200,
  MIN_RADIUS    : 1,
  MAX_RADIUS    : 7,
  DESIRE_DENSITY: 0.0002,
};

export default function SpoilerEffectComponent({ component, elRef, eventHandlers, pods }) {
  const { style, classList, display, effect, background, applyEffect } = component;
  const { onClick, onMouseEnter, onMouseMove, onMouseLeave } = eventHandlers;

  const [isApplied, setIsApplied] = useState(applyEffect);

  const handleOnClick = useCallback(() => {
    setIsApplied(!isApplied);
    onClick();
  }, [isApplied]);

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
      onClick={ handleOnClick }
      onMouseEnter={ onMouseEnter }
      onMouseMove={ onMouseMove }
      onMouseLeave={ onMouseLeave }>

      <div
        className={ cn('spoiler-effect-content', { blurred: isApplied }) }
        style={{ filter: isApplied ? `url(#filter-${effect})` : 'none' }}>
        { pods.spoilerEffectContent.render() }
      </div>

      { isApplied && (
        <svg className="svg" style={{ opacity: effect === EffectTypes.MORPHOLOGY ? DefaultValues.OPACITY : undefined }}>
          <Effect fill={ background }/>
        </svg>
      ) }
    </div>
  );
}

function BlurEffect({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-blur">
          <feGaussianBlur stdDeviation="8 16" x="0%" y="0%" in="SourceGraphic" edgeMode="none" result="blur"/>
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            in="blur"
            result="coloredBlur"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={ fill } filter="url(#filter-blur)"/>
    </>
  );
}

function MorphologyEffect({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-morphology">
          <feMorphology operator="dilate" radius="2 7" x="0%" y="0%" in="SourceGraphic" result="morphology2"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={ fill } filter="url(#filter-morphology)"/>
    </>
  );
}

function MorphoseEffect({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-morphose">
          <feGaussianBlur stdDeviation="8 20" x="0%" y="0%" in="SourceGraphic" edgeMode="none" result="blur">
            <animate attributeName="stdDeviation" values="8 20; 20 8; 8 20" dur="2s" repeatCount="indefinite"/>
          </feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            in="blur"
            result="coloredBlur"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={ fill } filter="url(#filter-morphose)"/>
    </>
  );
}

function MusicEffect({ fill }) {
  const [baseFrequency, setBaseFrequency] = useState(getRandomBaseFrequency());
  const animationRef = useRef();

  const updateBaseFrequency = () => {
    setBaseFrequency(getRandomBaseFrequency());
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateBaseFrequency);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateBaseFrequency, DefaultValues.BASE_FREQUENCY);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <defs>
        <filter id="filter-music">
          <feTurbulence type="fractalNoise" baseFrequency={ baseFrequency } numOctaves="1" result="warp"/>
          <feOffset dx="0" dy="" result="warpOffset"/>
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={ fill } filter="url(#filter-music)"/>
    </>
  );
}

function RipplesEffect({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-ripples">
          <feColorMatrix
            type="matrix"
            values="0.01 0 0 0 0
                    0.01 0 0 0 0
                    0.01 0 0 0 0
                    0 0 0 .5 0"
            in="SourceGraphic"
            result="colormatrix"
          />
          <feTurbulence type="turbulence" baseFrequency=".5 .5" numOctaves="10" seed="1" result="turbulence">
            <animate attributeName="seed" from="1" to="10" dur="1s" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap
            in="colormatrix"
            in2="turbulence"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displacementMap"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={ fill } filter="url(#filter-ripples)"/>
    </>
  );
}

function SmokeEffect({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-smoke">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.013 0.01"
            numOctaves="2"
            seed="1"
            stitchTiles="stitch"
            result="turbulence"
          />
          <feFlood floodColor={ fill } floodOpacity="1" result="flood"/>
          <feComposite in="flood" in2="turbulence" operator="in" result="composite1"/>
          <feComposite in="composite1" in2="SourceAlpha" operator="in" result="composite2"/>
        </filter>
      </defs>
    </>
  );
}

function SnowEffect({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-snow">
          <feGaussianBlur stdDeviation="8 20" x="0%" y="0%" in="SourceGraphic" edgeMode="none" result="blur">
            <animate attributeName="stdDeviation" values="8 20; 20 8; 8 20" dur="2s" repeatCount="indefinite"/>
          </feGaussianBlur>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={ fill } filter="url(#filter-snow)"/>
      { [...Array(getNumSnowflakes())].map((_, index) => {
        const radius = Math.random() * (DefaultValues.MAX_RADIUS - DefaultValues.MIN_RADIUS) + DefaultValues.MIN_RADIUS;
        const { x: startX, y: startY } = getRandomPosition();
        const animationDurationX = Math.random() * 10 + 5;
        const animationDurationY = Math.random() * 10 + 1;

        return (
          <circle key={ index } cx={ `${ startX }%` } cy={ `${ startY }%` } r={ radius } fill="#ffffff">
            <animate
              attributeName="cy"
              from={ `${ startY }%` }
              to="100%"
              dur={ `${ animationDurationY }s` }
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              from={ `${ startX - 5 }%` }
              to={ `${ startX + 5 }%` }
              dur={ `${ animationDurationX }s` }
              repeatCount="indefinite"
            />
          </circle>
        );
      }) }
    </>
  );
}

function TurbulenceEffect() {
  return (
    <>
      <defs>
        <filter id="filter-turbulence">
          <feTurbulence type="turbulence" baseFrequency="0.015 0.1" numOctaves="2" seed="2" stitchTiles="stitch"/>
        </filter>
      </defs>
    </>
  );
}

function getRandomBaseFrequency() {
  const minFrequencyX = 0.1;
  const maxFrequencyX = 0.3;
  const minFrequencyY = 0.01;
  const maxFrequencyY = 0.03;

  const randomFrequencyX = Math.random() * (maxFrequencyX - minFrequencyX) + minFrequencyX;
  const randomFrequencyY = Math.random() * (maxFrequencyY - minFrequencyY) + minFrequencyY;

  return `${ randomFrequencyX } ${ randomFrequencyY }`;
}

function getRandomPosition() {
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  return { x, y };
}

function getNumSnowflakes() {
  return Math.round(window.innerWidth * window.innerHeight * DefaultValues.DESIRE_DENSITY);
}
