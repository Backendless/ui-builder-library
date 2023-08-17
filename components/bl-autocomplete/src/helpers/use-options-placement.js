import { useLayoutEffect } from 'react';

const gap = 15;

export const useOptionsPlacement = props => {
  const { optionsContainerRef, autocompleteHeight, setOptionsPlacement } = props;

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (optionsContainerRef.current) {
        const viewPortHeight = window.innerHeight;
        const { bottom, height } = optionsContainerRef.current.getBoundingClientRect();

        setOptionsPlacement(placement => {
          const bottomCoordinate = placement === 'top' ? bottom + autocompleteHeight + height + gap : bottom;

          return viewPortHeight >= bottomCoordinate ? 'bottom' : 'top';
        });
      }
    };

    handleScroll();
    document.addEventListener('wheel', handleScroll);

    return () => document.removeEventListener('wheel', handleScroll);
  }, [autocompleteHeight, optionsContainerRef]);
};
