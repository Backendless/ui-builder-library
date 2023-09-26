const FIRE_BACKGROUND_IMAGE = 'radial-gradient(#4a0000, #000)';
const CURVES_PATH_GENERATOR = 'curvesPathGenerator';
const PRECISE_SIZE_MOSE = 'precise';

const AnimationRange = { MIN: 'min', MAX: 'max' };
const InteractivityAreas = { WINDOW: 'window', CANVAS: 'canvas' };
const EventModes = { PUSH: 'push', TRAIL: 'trail', LIGHT: 'light', SPLIT: 'split' };

const OutMode = {
  NONE   : 'none',
  SPLIT  : 'split',
  BOUNCE : 'bounce',
  DESTROY: 'destroy',
  OUT    : 'out',
};

export const Direction = {
  NONE     : 'none',
  TOP      : 'top',
  OUTSIDE  : 'outside',
  BOTTOM   : 'bottom',
  TOP_LEFT : 'top-left',
  TOP_RIGHT: 'top-right',
  RANDOM   : 'random',
  CLOCKWISE: 'clockwise',
};

export const Colors = {
  RANDOM       : 'random',
  BLACK        : '#000000',
  WHITE        : '#FFFFFF',
  BLUE         : '#3998D0',
  AQUA         : '#2EB6AF',
  LIME_GREEN   : '#A9BD33',
  GOLD         : '#FEC73B',
  ORANGE       : '#F89930',
  RED          : '#F45623',
  MAROON       : '#D62E32',
  PINK         : '#EB586E',
  PURPLE       : '#9952CF',
  SKY_BLUE     : '#26ccff',
  PLUM         : '#a25afd',
  CORAL        : '#ff5e7e',
  LIME         : '#88ff5a',
  YELLOW       : '#fcff42',
  ORANGE_YELLOW: '#ffa62d',
  MAGENTA      : '#ff36ff',
  MUSTARD      : '#fdcf58',
  GRAY         : '#757676',
  BROWN        : '#f27d0c',
  DARK_RED     : '#800909',
  AMBER        : '#f07f13',
  LIGHT_RED    : '#ff595e',
  GOLDEN_YELLOW: '#ffca3a',
  LEAF_GREEN   : '#8ac926',
  CERULEAN     : '#1982c4',
  DARK_LAVENDER: '#6a4c93',
  NAVY_BLUE    : '#1E00FF',
  FUCHSIA      : '#FF0061',
  GREEN        : '#E1FF00',
  TEAL         : '#00FF9E',
  CRIMSON      : '#ff0000',
  CHARCOAL     : '#333333',
  NAVY         : '#17163e',
  SAPPHIRE     : '#3b5e98',
};

export const Shapes = {
  CIRCLE: 'circle',
  IMAGE : 'image',
  LINE  : 'line',
  SPIRAL: 'spiral',
  SQUARE: 'square',
  TEXT  : 'text',
};

export const BigCircles = {
  particles: {
    number : { value: 30 },
    color  : {
      value: [
        Colors.BLUE, Colors.AQUA, Colors.LIME_GREEN, Colors.GOLD, Colors.ORANGE,
        Colors.RED, Colors.MAROON, Colors.PINK, Colors.PURPLE,
      ],
    },
    shape  : { type: Shapes.CIRCLE },
    opacity: { value: 0.5 },
    size   : { value: { min: 200, max: 400 } },
    move   : {
      enable   : true,
      angle    : { value: 30, offset: 0 },
      speed    : { min: 10, max: 12 },
      direction: Direction.TOP,
      outModes : { default: OutMode.DESTROY, bottom: OutMode.NONE },
    },
  },
  emitters : {
    position: { x: 50, y: 150 },
    rate    : { delay: 0.2, quantity: 3 },
    size    : { width: 100, height: 50 },
  },
};

export const Bubbles = {
  particles: {
    color  : { value: Colors.RANDOM },
    shape  : { type: Shapes.CIRCLE },
    opacity: { value: 0.3 },
    size   : { value: { min: 5, max: 10 } },
    move   : {
      angle    : { offset: 0, value: 30 },
      enable   : true,
      speed    : 15,
      direction: Direction.TOP,
      random   : false,
      straight : false,
      outModes : { default: OutMode.DESTROY },
    },
  },
  emitters : [
    {
      direction: Direction.TOP,
      position : { y: 100 },
      life     : { duration: 3, delay: 5, count: 0 },
    },
  ],
};

export const Confetti = {
  particles: {
    number : { value: 0 },
    color  : {
      value: [
        Colors.SKY_BLUE, Colors.PLUM, Colors.CORAL, Colors.LIME, Colors.YELLOW, Colors.ORANGE_YELLOW, Colors.MAGENTA,
      ],
    },
    shape  : { type: [Shapes.SQUARE, Shapes.CIRCLE] },
    opacity: {
      value    : { min: 0, max: 1 },
      animation: { enable: true, speed: 0.5, startValue: AnimationRange.MAX, destroy: AnimationRange.MIN },
    },
    size   : { value: 5 },
    links  : { enable: false },
    life   : {
      duration: { sync: true, value: 20 / 6 },
      count   : 1,
    },
    move   : {
      angle    : { value: 45, offset: 0 },
      drift    : 0,
      enable   : true,
      gravity  : { enable: true, acceleration: 9.81 },
      speed    : 45,
      decay    : 0.1,
      direction: -90,
      random   : true,
      straight : false,
      outModes : { default: OutMode.NONE, bottom: OutMode.DESTROY },
    },
    rotate : {
      value    : { min: 0, max: 360 },
      direction: Direction.RANDOM,
      animation: { enable: true, speed: 60 },
    },
    tilt   : {
      direction: Direction.RANDOM,
      enable   : true,
      value    : { min: 0, max: 360 },
      animation: { enable: true, speed: 60 },
    },
    roll   : {
      darken: { enable: true, value: 25 },
      enable: true,
      speed : { min: 15, max: 25 },
    },
    wobble : {
      distance: 30,
      enable  : true,
      speed   : { min: -15, max: 15 },
    },
  },
  motion   : { disable: true },
  emitters : {
    startCount: 150,
    position  : { x: 50, y: 50 },
    size      : { width: 0, height: 0 },
    rate      : { delay: 0, quantity: 0 },
    life      : { duration: 0.1, count: 1 },
  },
};

export const Fire = {
  fpsLimit     : 40,
  background   : { image: FIRE_BACKGROUND_IMAGE },
  particles    : {
    number : { value: 200, density: { enable: true } },
    color  : { value: [Colors.MUSTARD, Colors.GRAY, Colors.BROWN, Colors.DARK_RED, Colors.AMBER] },
    opacity: { value: { min: 0.1, max: 0.5 } },
    size   : { value: { min: 1, max: 3 } },
    move   : { enable: true, speed: 6, random: false },
  },
  interactivity: {
    detectsOn: InteractivityAreas.WINDOW,
    events   : {
      onClick: { enable: true, mode: EventModes.PUSH },
      resize : true,
    },
  },
};

export const Firefly = {
  background   : { color: Colors.BLACK },
  particles    : {
    number : { value: 0 },
    color  : { value: Colors.WHITE },
    life   : { duration: { value: 5, sync: false }, count: 1 },
    opacity: {
      value    : { min: 0.1, max: 1 },
      animation: { enable: true, speed: 3 },
    },
    size   : { value: { min: 3, max: 6 } },
    move   : { enable: true, speed: 3, random: false, size: true },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: EventModes.TRAIL },
      resize : true,
    },
    modes : { trail: { delay: 0.5, pauseOnStop: true, quantity: 4 } },
  },
};

export const Fireworks = {
  background: { color: Colors.BLACK },
  emitters  : {
    direction: Direction.TOP,
    life     : { count: 0, duration: 0.1, delay: 0.1 },
    rate     : { delay: 0.15, quantity: 1 },
    size     : { width: 100, height: 0 },
    position : { y: 100, x: 50 },
  },
  particles : {
    number : { value: 0 },
    destroy: {
      bounds: { top: 30 },
      mode  : EventModes.SPLIT,
      split : {
        count    : 1,
        factor   : { value: 0.333333 },
        rate     : { value: 50 },
        particles: {
          stroke    : { width: 0 },
          color     : {
            value: [Colors.LIGHT_RED, Colors.GOLDEN_YELLOW, Colors.LEAF_GREEN, Colors.CERULEAN, Colors.DARK_LAVENDER],
          },
          number    : { value: 0 },
          collisions: { enable: false },
          destroy   : { bounds: { top: 0 } },
          opacity   : {
            value    : { min: 0.1, max: 1 },
            animation: {
              enable    : true,
              speed     : 0.7,
              sync      : false,
              startValue: AnimationRange.MAX,
              destroy   : AnimationRange.MIN,
            },
          },
          shape     : { type: Shapes.CIRCLE },
          size      : { value: 2, animation: { enable: false } },
          life      : { count: 1, duration: { value: { min: 1, max: 2 } } },
          move      : {
            enable   : true,
            gravity  : { enable: true, acceleration: 9.81, inverse: false },
            decay    : 0.1,
            speed    : { min: 10, max: 25 },
            direction: Direction.OUTSIDE,
            random   : true,
            straight : false,
            outModes : OutMode.DESTROY,
          },
        },
      },
    },
    life   : { count: 1 },
    shape  : { type: Shapes.LINE },
    size   : {
      value    : { min: 0.1, max: 50 },
      animation: { enable: true, sync: true, speed: 90, startValue: AnimationRange.MAX, destroy: AnimationRange.MIN },
    },
    stroke : { color: { value: Colors.WHITE }, width: 1 },
    rotate : { path: true },
    move   : {
      enable  : true,
      gravity : { acceleration: 15, enable: true, inverse: true, maxSpeed: 100 },
      speed   : { min: 10, max: 20 },
      outModes: { default: OutMode.DESTROY, top: OutMode.NONE },
      trail   : { fillColor: Colors.BLACK, enable: true, length: 10 },
    },
  },
};

export const Links = {
  background: { color: Colors.BLACK },
  particles : {
    number: { value: 100, density: { enable: true } },
    links : { distance: 150, enable: true },
    move  : { enable: true },
    size  : { value: 1 },
    shape : { type: Shapes.CIRCLE },
  },
};

export const SeaAnemone = {
  particles   : {
    color  : { value: Colors.CRIMSON },
    move   : {
      direction: Direction.NONE,
      enable   : true,
      outModes : { default: OutMode.DESTROY },
      path     : {
        clamp    : false,
        enable   : true,
        delay    : { value: 0 },
        generator: CURVES_PATH_GENERATOR,
      },
      random   : false,
      speed    : 2,
      straight : false,
      trail    : { fillColor: Colors.BLACK, length: 30, enable: true },
    },
    number : { value: 0, limit: 300 },
    opacity: { value: 1 },
    shape  : { type: Shapes.CIRCLE },
    size   : {
      value    : { min: 1, max: 10 },
      animation: {
        count     : 1,
        startValue: AnimationRange.MIN,
        enable    : true,
        speed     : 10,
        sync      : true,
      },
    },
  },
  background  : { color: Colors.BLACK },
  detectRetina: true,
  emitters    : {
    direction : Direction.NONE,
    rate      : { quantity: 10, delay: 0.3 },
    size      : { width: 0, height: 0, mode: PRECISE_SIZE_MOSE },
    spawnColor: {
      value    : Colors.CRIMSON,
      animation: {
        h: {
          enable: true,
          offset: { min: -1.4, max: 1.4 },
          speed : 5,
          sync  : false,
        },
        l: {
          enable: true,
          offset: { min: 20, max: 80 },
          speed : 0,
          sync  : false,
        },
      },
    },
    position  : { x: 50, y: 50 },
  },
};

export const Snow = {
  background: { color: Colors.CHARCOAL },
  particles : {
    number : { value: 130, density: { enable: true } },
    move   : {
      direction: Direction.BOTTOM,
      enable   : true,
      random   : false,
      straight : false,
    },
    opacity: { value: { min: 0.1, max: 0.5 } },
    size   : { value: { min: 1, max: 10 } },
    wobble : {
      distance: 20,
      enable  : true,
      speed   : { min: -5, max: 5 },
    },
  },
};

export const Stars = {
  background: { color: Colors.BLACK },
  particles : {
    number : { value: 150, density: { enable: true } },
    move   : {
      direction: Direction.NONE,
      enable   : true,
      outModes : { default: OutMode.OUT },
      random   : true,
      speed    : 0.1,
      straight : false,
    },
    opacity: {
      animation: { enable: true, speed: 1, sync: false },
      value    : { min: 0, max: 1 },
    },
    size   : { value: { min: 1, max: 3 } },
  },
};

export const Triangles = {
  background: { color: Colors.BLACK },
  particles : {
    shape  : { type: Shapes.CIRCLE },
    number : { value: 100, density: { enable: true } },
    size   : { value: 3, random: true },
    move   : { enable: true, speed: 5 },
    color  : {
      value    : Colors.CRIMSON,
      animation: { enable: true, speed: 20, sync: true },
    },
    opacity: { value: 0.5, random: false },
    links  : {
      enable   : true,
      distance : 150,
      color    : Colors.RANDOM,
      opacity  : 0.4,
      width    : 1,
      triangles: { enable: true, color: Colors.WHITE, opacity: 0.1 },
    },
  },
};

export const Light = {
  particles    : {
    number : { value: 30, density: { enable: true } },
    color  : {
      value    : Colors.CRIMSON,
      animation: { enable: true, speed: 20, sync: true },
    },
    shape  : { type: [Shapes.CIRCLE, Shapes.SQUARE] },
    opacity: { value: 1 },
    size   : {
      value : 30,
      random: { enable: true, minimumValue: 15 },
    },
    rotate : {
      value    : 0,
      direction: Direction.CLOCKWISE,
      animation: { speed: 5, enable: true },
    },
    move   : { enable: true, speed: 6, direction: Direction.NONE },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: EventModes.LIGHT } },
    modes : {
      light: {
        area  : { gradient: { start: Colors.SAPPHIRE, stop: Colors.NAVY } },
        shadow: { color: Colors.NAVY },
      },
    },
  },
  background   : { color: Colors.NAVY },
};

export const Growing = {
  background: { color: Colors.BLACK },
  emitters  : {
    direction: Direction.TOP,
    size     : { width: 100, height: 0 },
    position : { x: 50, y: 100 },
    rate     : { delay: 0.1, quantity: 2 },
  },
  particles : {
    number : { value: 0, density: { enable: true } },
    color  : { value: Colors.RANDOM },
    shape  : { type: Shapes.CIRCLE },
    opacity: { value: 1, random: false },
    size   : {
      value    : 20,
      random   : false,
      animation: {
        enable    : true,
        speed     : 5,
        size_min  : 0.1,
        sync      : true,
        startValue: AnimationRange.MIN,
        destroy   : AnimationRange.MAX,
      },
    },
    move   : {
      enable   : true,
      speed    : 5,
      direction: Direction.NONE,
      random   : false,
      straight : false,
      outModes : OutMode.DESTROY,
      attract  : { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
};

export const Hyperspace = {
  background: { color: Colors.BLACK },
  particles : {
    color  : {
      value: [
        Colors.BLUE, Colors.AQUA, Colors.LIME_GREEN, Colors.GOLD, Colors.ORANGE,
        Colors.RED, Colors.MAROON, Colors.PINK, Colors.PURPLE,
      ],
    },
    move   : {
      attract  : { enable: false, rotate: { x: 800, y: 800 } },
      direction: Direction.NONE,
      enable   : true,
      outModes : { default: OutMode.DESTROY },
      random   : false,
      speed    : 3,
      straight : false,
      trail    : { fillColor: Colors.BLACK, length: 30, enable: true },
    },
    number : { density: { enable: true }, value: 0 },
    opacity: { value: 1 },
    shape  : { type: Shapes.CIRCLE },
    size   : {
      value    : 25,
      animation: {
        startValue  : AnimationRange.MIN,
        enable      : true,
        minimumValue: 1,
        speed       : 2,
        destroy     : AnimationRange.MAX,
        sync        : true,
      },
    },
  },
  emitters  : {
    direction: Direction.NONE,
    rate     : { quantity: 5, delay: 0.3 },
    size     : { width: 0, height: 0 },
    position : { x: 50, y: 50 },
  },
};

export const TetradicConfetti = {
  particles    : {
    number : { value: 0 },
    color  : { value: [Colors.NAVY_BLUE, Colors.FUCHSIA, Colors.GREEN, Colors.TEAL] },
    shape  : { type: [Shapes.CIRCLE, Shapes.SQUARE] },
    opacity: {
      value    : { max: 1, min: 0 },
      animation: { enable: true, speed: 2, startValue: AnimationRange.MAX, destroy: AnimationRange.MIN },
    },
    size   : { value: { min: 3, max: 7 } },
    life   : { duration: { sync: true, value: 5 }, count: 1 },
    move   : {
      enable   : true,
      gravity  : { enable: true, acceleration: 20 },
      speed    : { min: 25, max: 50 },
      drift    : { min: -2, max: 2 },
      decay    : 0.05,
      direction: Direction.NONE,
      outModes : { default: OutMode.DESTROY, top: OutMode.NONE },
    },
    rotate : {
      value    : { min: 0, max: 360 },
      direction: Direction.RANDOM,
      move     : true,
      animation: { enable: true, speed: 60 },
    },
    tilt   : {
      direction: Direction.RANDOM,
      enable   : true,
      move     : true,
      value    : { min: 0, max: 360 },
      animation: { enable: true, speed: 60 },
    },
    roll   : {
      darken: { enable: true, value: 25 },
      enable: true,
      speed : { min: 15, max: 25 },
    },
    wobble : {
      distance: 30,
      enable  : true,
      move    : true,
      speed   : { min: -15, max: 15 },
    },
  },
  interactivity: { detectsOn: InteractivityAreas.CANVAS, events: { resize: true } },
  responsive   : [
    {
      maxWidth: 700,
      options : {
        particles: { move: { speed: 20, decay: 0.1 } },
        emitters : [
          {
            direction: Direction.TOP_RIGHT,
            rate     : { delay: 0.1, quantity: 3 },
            position : { x: 0, y: 50 },
            size     : { width: 0, height: 0 },
          },
          {
            direction: Direction.TOP_LEFT,
            rate     : { delay: 0.1, quantity: 3 },
            position : { x: 100, y: 50 },
            size     : { width: 0, height: 0 },
          },
        ],
      },
    },
  ],
  emitters     : [
    {
      direction: Direction.TOP_RIGHT,
      rate     : { delay: 0.1, quantity: 10 },
      position : { x: 0, y: 50 },
      size     : { width: 0, height: 0 },
    },
    {
      direction: Direction.TOP_LEFT,
      rate     : { delay: 0.1, quantity: 10 },
      position : { x: 100, y: 50 },
      size     : { width: 0, height: 0 },
    },
  ],
};
