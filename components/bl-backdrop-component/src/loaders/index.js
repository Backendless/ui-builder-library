import { BarLoader } from './bar';
import { DotedCircleLoader } from './doted-circle';
import { DotedHorizonLoader } from './doted-horizon';
import { DotedLineCircleLoader } from './doted-line-circle';
import { DotedSquareLoader } from './doted-square';
import { LineCircleLoader } from './line-circle';
import { RadarLoader } from './radar';

const LoaderTypes = {
  lineCircle     : 'line circle',
  dotedCircle    : 'doted circle',
  bar            : 'bar',
  dotedLineCircle: 'doted line circle',
  radar          : 'radar',
  dotedSquare    : 'doted square',
  dotedHorizon   : 'doted horizon',
};

export const LoadersMap = {
  [LoaderTypes.lineCircle]     : LineCircleLoader,
  [LoaderTypes.dotedCircle]    : DotedCircleLoader,
  [LoaderTypes.bar]            : BarLoader,
  [LoaderTypes.dotedLineCircle]: DotedLineCircleLoader,
  [LoaderTypes.radar]          : RadarLoader,
  [LoaderTypes.dotedSquare]    : DotedSquareLoader,
  [LoaderTypes.dotedHorizon]   : DotedHorizonLoader,
};
