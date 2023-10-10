import { useCallback, useEffect, useRef, useState } from 'react';

const DefaultValues = {
  MIN_RADIUS       : 1,
  MAX_RADIUS       : 7,
  DESIRE_DENSITY   : 0.0002,
  Frequency: {
    UPDATE_INTERVAL: 200,
    MIN_X          : 0.1,
    MAX_X          : 0.3,
    MIN_Y          : 0.01,
    MAX_Y          : 0.03,
   },
};

const SNOWFLAKES = generateSnowflakes();

export function Blur({ fill }) {
  return (
    <>
      <defs>
        <filter id="filter-blur">
          <feGaussianBlur stdDeviation="8 6" x="0%" y="0%" in="SourceGraphic" edgeMode="none" result="blur"/>
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

export function Morphology({ fill }) {
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

export function Morphose({ fill }) {
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

export function Music({ fill }) {
  const [baseFrequency, setBaseFrequency] = useState(getRandomBaseFrequency);
  const animationRef = useRef();

  const updateBaseFrequency = useCallback(() => {
    setBaseFrequency(getRandomBaseFrequency());
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateBaseFrequency);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateBaseFrequency, DefaultValues.Frequency.UPDATE_INTERVAL);

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

export function Ripples({ fill }) {
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

export function Smoke({ fill }) {
  return (
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
  );
}

export function Snow({ fill }) {
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

      { SNOWFLAKES.map(({ startX, startY, radius, animationDurationX, animationDurationY }, index) => (
        <Snowflake
          key={ index }
          startX={ startX }
          startY={ startY }
          radius={ radius }
          animationDurationX={ animationDurationX }
          animationDurationY={ animationDurationY }
        />
      )) }
    </>
  );
}

export function Turbulence() {
  return (
    <defs>
      <filter id="filter-turbulence">
        <feTurbulence type="turbulence" baseFrequency="0.015 0.1" numOctaves="2" seed="2" stitchTiles="stitch"/>
      </filter>
    </defs>
  );
}

function Snowflake({ startX, startY, radius, animationDurationX, animationDurationY }) {
  return (
    <circle cx={ `${ startX }%` } cy={ `${ startY }%` } r={ radius } fill="#ffffff">
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
}

function getRandomBaseFrequency() {
  const { Frequency } = DefaultValues;
  const randomFrequencyX = Math.random() * (Frequency.MAX_X - Frequency.MIN_X) + Frequency.MIN_X;
  const randomFrequencyY = Math.random() * (Frequency.MAX_Y - Frequency.MIN_Y) + Frequency.MIN_Y;

  return `${ randomFrequencyX } ${ randomFrequencyY }`;
}

function getRandomPosition() {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  };
}

function generateSnowflakes() {
  const particlesCount = Math.round(window.innerWidth * window.innerHeight * DefaultValues.DESIRE_DENSITY);
  const snowflakes = [];

  for (let i = 0; i < particlesCount; i++) {
    const radius = Math.random() * (DefaultValues.MAX_RADIUS - DefaultValues.MIN_RADIUS) + DefaultValues.MIN_RADIUS;
    const { x: startX, y: startY } = getRandomPosition();
    const animationDurationX = Math.random() * 10 + 5;
    const animationDurationY = Math.random() * 10 + 1;

    snowflakes.push({ startX, startY, radius, animationDurationX, animationDurationY });
  }

  return snowflakes;
}
