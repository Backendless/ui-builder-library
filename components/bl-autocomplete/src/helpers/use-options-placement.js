import { useLayoutEffect } from 'react';

const GAP = 15; // margin between dropdown list and input field

export const useOptionsPlacement = props => {
  const { optionsContainerRef, autocompleteHeight, setOptionsPlacement } = props;

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (optionsContainerRef.current) {
        const viewPortHeight = window.innerHeight;
        const { bottom, height } = optionsContainerRef.current.getBoundingClientRect();

        setOptionsPlacement(placement => {
          const bottomCoordinate = placement === 'top' ? bottom + autocompleteHeight + height + GAP : bottom;

          return viewPortHeight >= bottomCoordinate ? 'bottom' : 'top';
        });
      }
    };

    handleScroll();
    document.addEventListener('wheel', handleScroll);

    return () => document.removeEventListener('wheel', handleScroll);
  }, [autocompleteHeight, optionsContainerRef]);
};
