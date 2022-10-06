import { useLayoutEffect } from 'react';

export const useOptionsPlacement = props => {
  const { optionsContainerRef, autocompleteHeight, setOptionsPlacement } = props;
  
  useLayoutEffect(() => {
    const handleScroll = () => {
      const viewPortHeight = window.innerHeight;
      const { bottom, height } = optionsContainerRef.current?.getBoundingClientRect();

      setOptionsPlacement(placement => {
        const bottomCoordinate = placement === 'top' ? bottom + autocompleteHeight + height  : bottom;

        return (viewPortHeight - bottomCoordinate) > 0 ? 'bottom' : 'top';
      });
    };

    handleScroll();
    document.addEventListener('wheel', handleScroll);

    return () => document.removeEventListener('wheel', handleScroll);
  }, [autocompleteHeight, optionsContainerRef]);
};
