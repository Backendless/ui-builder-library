import { useMemo } from 'react';

import {
  loadBubbleShape, loadCanvasMaskPlugin, loadCardsShape, loadCurvesPath, loadEasingBackPlugin, loadEasingCircPlugin,
  loadEasingCubicPlugin, loadEasingExpoPlugin, loadEasingQuadPlugin, loadEasingQuartPlugin, loadEasingQuintPlugin,
  loadEasingSinePlugin, loadFull, loadGradientUpdater, loadHeartShape, loadHsvColorPlugin, loadInfectionPlugin,
  loadLightInteraction, loadMotionPlugin, loadMultilineTextShape, loadOrbitUpdater, loadParticlesRepulseInteraction,
  loadPathShape, loadPerlinNoisePath, loadPolygonMaskPlugin, loadPolygonPath, loadRoundedRectShape,
  loadSimplexNoisePath, loadSoundsPlugin, loadSpiralShape,
} from './lib/particles.min';

import {
  BigCircles, Bubbles, Colors, Confetti, Direction, Fire, Firefly, Fireworks, Growing,
  Hyperspace, Light, Links, SeaAnemone, Shapes, Snow, Stars, TetradicConfetti, Triangles,
} from './options';

const Presets = {
  BIG_CIRCLES      : 'bigCircles',
  BUBBLES          : 'bubbles',
  CONFETTI         : 'confetti',
  FIRE             : 'fire',
  FIREFLY          : 'firefly',
  FIREWORKS        : 'fireworks',
  GROWING          : 'growing',
  HYPERSPACE       : 'hyperspace',
  LIGHT            : 'light',
  LINKS            : 'links',
  SEA_ANEMONE      : 'seaAnemone',
  SNOW             : 'snow',
  STARS            : 'stars',
  TETRADIC_CONFETTI: 'tetradicConfetti',
  TRIANGLES        : 'triangles',
};

const PresetsMap = {
  [Presets.BIG_CIRCLES]      : BigCircles,
  [Presets.BUBBLES]          : Bubbles,
  [Presets.CONFETTI]         : Confetti,
  [Presets.FIRE]             : Fire,
  [Presets.FIREFLY]          : Firefly,
  [Presets.FIREWORKS]        : Fireworks,
  [Presets.GROWING]          : Growing,
  [Presets.HYPERSPACE]       : Hyperspace,
  [Presets.LIGHT]            : Light,
  [Presets.LINKS]            : Links,
  [Presets.SEA_ANEMONE]      : SeaAnemone,
  [Presets.SNOW]             : Snow,
  [Presets.STARS]            : Stars,
  [Presets.TETRADIC_CONFETTI]: TetradicConfetti,
  [Presets.TRIANGLES]        : Triangles,
};

const HEX_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})([0-9a-f]{2})?$/i;
const RGBA_REGEX = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/;
const HSLA_REGEX = /^hsla?\((\d+),\s*(\d+%?),\s*(\d+%?)(?:,\s*([\d.]+))?\)$/;
const UNSET_COLLISION_MODE = 'unset';
const LINKS_DISTANCE = 150;
const STROKE_WIDTH = 2;
const COLOR_ANIMATION_SPEED = 20;
const DEFAULT_Z_INDEX = 0;
const DEFAULT_TIMING = 0;
const DEFAULT_IMAGE_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAmklEQVR42mP8/6BxwMS' +
  'AweSLTxIoBrAGVCDMEArAhoDCxgEzAmBpA1oAsGASMAZwhGIKzBgLcHMC2B2AwYBkwSMyAwAF2AGGA1gYgC2BBMYDSgDGgMwR8gDmH1ABDMCqAIQVw' +
  'DAgAUEAIBCDJAACISNAEIAxkFgBbJCACSRiRyBSoA3gIAAlEAISlCB4DwYdohkhITMAaGAmPVAzJpSAYVgAdhCAxkgsJCGZMwBA2YYIbQFzQBgRmB' +
  'iFgjQRyBQyAyYBmkXgHBMAKZKAEigCJMBuAIaJAAAQBJIigISUJgAABRxUigOQAkAAAAAElFTkSuQmCC';

const Opacity = { FULL: 1, LOW: 0.1 };
const RotateDegrees = { MIN: 0, MAX: 360 };
const SpiralShapeProps = {
  particles  : { stroke: { width: STROKE_WIDTH } },
  innerRadius: 1,
  lineSpacing: 1,
  fill       : false,
  close      : false,
};

const LineShapeProps = {
  particles: {
    stroke: { width: STROKE_WIDTH },
    move  : { straight: true },
    rotate: { path: true },
  },
};

export function useOptions(component) {
  const {
    preset, textValue, color, background, autoPlay, fullScreen, shape, zIndex, lineLinksVisibility, move, size,
    speed, direction, colorAnimation, number, imageURL, rotate, rotationAnimation, customOptions, linksColor,
    rollingAnimation, duration, delay, triangleLinksVisibility, collisionMode, outModes,
  } = component;

  const { color: backgroundColor, opacity: backgroundOpacity } = useMemo(() => parseColor(background), [background]);
  const { color: linkColor, opacity: linkOpacity } = useMemo(() => parseColor(linksColor), [linksColor]);
  const { color: particlesColor, opacity: particlesOpacity } = useMemo(() => {
    if (Array.isArray(color)) {
      return { color };
    }

    return parseColor(color);
  }, [color]);

  if (shape === Shapes.IMAGE && !imageURL) {
    console.warn('Warning: You have selected Image type as the particles shape, but no image source has been ' +
      'provided. Please make sure to specify the Image URL(s) property in the Particles component settings.');
  }

  const particles = useMemo(() => ({
    collisions: { enable: collisionMode !== UNSET_COLLISION_MODE, mode: collisionMode },
    links     : {
      enable   : lineLinksVisibility || triangleLinksVisibility,
      distance : LINKS_DISTANCE,
      color    : linkColor || Colors.RANDOM,
      opacity  : lineLinksVisibility ? linkOpacity : Opacity.LOW,
      triangles: {
        enable : triangleLinksVisibility,
        color  : linkColor,
        opacity: Opacity.LOW,
      },
    },
    rotate    : {
      value    : rotate ? RotateDegrees.MAX : RotateDegrees.MIN,
      random   : true,
      direction: Direction.RANDOM,
      animation: { enable: rotationAnimation, speed, sync: false },
    },
    roll      : { enable: rollingAnimation, speed },
    color     : {
      value    : particlesColor || Colors.RANDOM,
      animation: { enable: colorAnimation, speed: COLOR_ANIMATION_SPEED },
    },
    opacity   : { value: particlesOpacity },
    shape     : {
      type   : shape,
      options: {
        [Shapes.IMAGE] : Array.isArray(imageURL) ? imageURL : { src: imageURL || DEFAULT_IMAGE_URL },
        [Shapes.TEXT]  : { value: textValue },
        [Shapes.SPIRAL]: SpiralShapeProps,
        [Shapes.LINE]  : LineShapeProps,
      },
    },
    move      : { enable: move, direction, speed, outModes },
    size      : { value: size },
    number    : { value: number, density: { enable: true } },
  }), [
    collisionMode, lineLinksVisibility, triangleLinksVisibility, linkColor, linkOpacity, rotate, rotationAnimation,
    speed, rollingAnimation, particlesColor, colorAnimation, particlesOpacity, shape, imageURL, textValue, move,
    direction, outModes, size, number,
  ]);

  const otherProps = useMemo(() => ({
    duration  : duration || DEFAULT_TIMING,
    delay     : delay || DEFAULT_TIMING,
    fullScreen: { enable: fullScreen, zIndex: zIndex || DEFAULT_Z_INDEX },
    background: { color: backgroundColor, opacity: backgroundOpacity },
    ...PresetsMap[preset],
  }), [duration, delay, fullScreen, zIndex, backgroundColor, backgroundOpacity, preset]);

  return {
    detectRetina: true, pauseOnBlur: false,
    autoPlay, particles,
    ...otherProps, ...customOptions,
  };
}

const ParsersList = [
  {
    regexp        : HEX_REGEX,
    buildColor    : matches => `#${ matches[1] }`,
    extractOpacity: matches => matches[2] ? parseFloat((parseInt(matches[2], 16) / 255).toFixed(2)) : Opacity.FULL,
  },
  {
    regexp        : RGBA_REGEX,
    buildColor    : matches => `rgb(${ matches[1] }, ${ matches[2] }, ${ matches[3] })`,
    extractOpacity: matches => matches[4] ? parseFloat(matches[4]) : Opacity.FULL,
  },
  {
    regexp        : HSLA_REGEX,
    buildColor    : matches => `hsl(${ matches[1] }, ${ matches[2] }, ${ matches[3] })`,
    extractOpacity: matches => matches[4] ? parseFloat(matches[4]) : Opacity.FULL,
  },
];

function parseColor(value) {
  const parser = ParsersList.find(parser => parser.regexp.test(value));

  if (!parser) {
    return {};
  }

  const matches = value.match(parser.regexp);
  const color = parser.buildColor(matches);
  const opacity = parser.extractOpacity(matches);

  return { color, opacity };
}

async function loadShapes(engine) {
  await Promise.all([
    loadBubbleShape(engine),
    loadCardsShape(engine),
    loadHeartShape(engine),
    loadMultilineTextShape(engine),
    loadPathShape(engine),
    loadRoundedRectShape(engine),
    loadSpiralShape(engine),
  ]);
}

async function loadPlugins(engine) {
  await Promise.all([
    loadHsvColorPlugin(),
    loadEasingBackPlugin(),
    loadEasingCircPlugin(),
    loadEasingCubicPlugin(),
    loadEasingExpoPlugin(),
    loadEasingQuadPlugin(),
    loadEasingQuartPlugin(),
    loadEasingQuintPlugin(),
    loadEasingSinePlugin(),
    loadPolygonMaskPlugin(engine),
    loadCanvasMaskPlugin(engine),
    loadMotionPlugin(engine),
    loadSoundsPlugin(engine),
    loadInfectionPlugin(engine),
  ]);
}

async function loadUpdaters(engine) {
  await Promise.all([
    loadGradientUpdater(engine),
    loadOrbitUpdater(engine),
  ]);
}

async function loadPaths(engine) {
  await Promise.all([
    loadCurvesPath(engine),
    loadPerlinNoisePath(engine),
    loadPolygonPath(engine),
    loadSimplexNoisePath(engine),
  ]);
}

async function loadInteractions(engine) {
  await Promise.all([
    loadLightInteraction(engine),
    loadParticlesRepulseInteraction(engine),
  ]);
}

export async function loadParticles(engine) {
  await Promise.all([
    loadFull(engine),
    loadPlugins(engine),
    loadInteractions(engine),
    loadUpdaters(engine),
    loadPaths(engine),
    loadShapes(engine),
  ]);
}
