import { useMemo } from 'react';

const useStyles = (src, zoomPosition, zoom) => {
  return useMemo(() => ({
    figure: {
      backgroundImage   : `url(${ src })`,
      backgroundPosition: zoomPosition,
      backgroundSize    : `${ zoom }% ${ zoom }%`,
    },
  }), [src, zoomPosition, zoom]);
};

export default useStyles;
