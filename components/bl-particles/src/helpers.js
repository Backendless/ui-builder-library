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
const DEFAULT_Z_INDEX = 0;
const DEFAULT_TIMING = 0;

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
      opacity  : lineLinksVisibility ? Opacity.FULL : Opacity.LOW,
      triangles: {
        enable : triangleLinksVisibility,
        color  : linksColor,
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
