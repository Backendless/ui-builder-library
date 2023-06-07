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

const UNSET_COLLISION_MODE = 'unset';
const LINKS_DISTANCE = 150;
const STROKE_WIDTH = 2;
const COLOR_ANIMATION_SPEED = 20;
const OPACITY = { FULL: 1, LOW: 0.1 };
const DEFAULT_Z_INDEX = 0;
const DEFAULT_TIMING = 0;
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
    preset, textValue, color, backgroundColor, autoPlay, fullScreen, shape, zIndex, lineLinksVisibility, move, size,
    speed, opacity, direction, colorAnimation, number, imageURL, rotate, rotationAnimation, customOptions, linksColor,
    rollingAnimation, duration, delay, triangleLinksVisibility, collisionMode, outModes, backgroundOpacity,
  } = component;

  const particles = useMemo(() => ({
    collisions: { enable: collisionMode !== UNSET_COLLISION_MODE, mode: collisionMode },
    links     : {
      enable   : lineLinksVisibility || triangleLinksVisibility,
      distance : LINKS_DISTANCE,
      color    : linksColor || Colors.RANDOM,
      opacity  : OPACITY[lineLinksVisibility ? 'FULL' : 'LOW'],
      triangles: {
        enable : triangleLinksVisibility,
        color  : linksColor,
        opacity: OPACITY.LOW,
      },
    },
    rotate    : {
      value    : RotateDegrees[rotate ? 'MAX' : 'MIN'],
      random   : true,
      direction: Direction.RANDOM,
      animation: { enable: rotationAnimation, speed, sync: false },
    },
    roll      : { enable: rollingAnimation, speed },
    color     : {
      value    : color || Colors.RANDOM,
      animation: { enable: colorAnimation, speed: COLOR_ANIMATION_SPEED },
    },
    opacity   : { value: opacity },
    shape     : {
      type   : shape,
      options: {
        [Shapes.IMAGE] : Array.isArray(imageURL) ? imageURL : { src: imageURL },
        [Shapes.TEXT]  : { value: textValue },
        [Shapes.SPIRAL]: SpiralShapeProps,
        [Shapes.LINE]  : LineShapeProps,
      },
    },
    move      : { enable: move, direction, speed, outModes },
    size      : { value: size },
    number    : { value: number, density: { enable: true } },
  }), [
    collisionMode, lineLinksVisibility, triangleLinksVisibility, linksColor, rotate, rotationAnimation, speed, number,
    rollingAnimation, color, colorAnimation, opacity, shape, imageURL, textValue, move, direction, outModes, size,
  ]);

  return useMemo(() => ({
    autoPlay, particles,
    duration    : duration || DEFAULT_TIMING,
    delay       : delay || DEFAULT_TIMING,
    fullScreen  : { enable: fullScreen, zIndex: zIndex || DEFAULT_Z_INDEX },
    background  : { color: backgroundColor, opacity: backgroundOpacity },
    detectRetina: true,
    pauseOnBlur : false,
    ...PresetsMap[preset],
    ...customOptions,
  }), [
    autoPlay, particles, duration, delay, fullScreen, zIndex, backgroundColor, backgroundOpacity, preset, customOptions,
  ]);
}

async function loadShapes(engine) {
  await loadBubbleShape(engine);
  await loadCardsShape(engine);
  await loadHeartShape(engine);
  await loadMultilineTextShape(engine);
  await loadPathShape(engine);
  await loadRoundedRectShape(engine);
  await loadSpiralShape(engine);
}

async function loadPlugins(engine) {
  await loadHsvColorPlugin();
  await loadEasingBackPlugin();
  await loadEasingCircPlugin();
  await loadEasingCubicPlugin();
  await loadEasingExpoPlugin();
  await loadEasingQuadPlugin();
  await loadEasingQuartPlugin();
  await loadEasingQuintPlugin();
  await loadEasingSinePlugin();
  await loadPolygonMaskPlugin(engine);
  await loadCanvasMaskPlugin(engine);
  await loadMotionPlugin(engine);
  await loadSoundsPlugin(engine);
  await loadInfectionPlugin(engine);
}

async function loadUpdaters(engine) {
  await loadGradientUpdater(engine);
  await loadOrbitUpdater(engine);
}

async function loadPaths(engine) {
  await loadCurvesPath(engine);
  await loadPerlinNoisePath(engine);
  await loadPolygonPath(engine);
  await loadSimplexNoisePath(engine);
}

async function loadInteractions(engine) {
  await loadLightInteraction(engine);
  await loadParticlesRepulseInteraction(engine);
}

export async function loadParticles(engine) {
  await loadFull(engine);
  await loadPlugins(engine);
  await loadInteractions(engine);
  await loadUpdaters(engine);
  await loadPaths(engine);
  await loadShapes(engine);
}
