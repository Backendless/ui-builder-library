import { useState, useLayoutEffect, useRef } from 'react';

import { Suggestion } from './components/suggestion';

export const Suggestions = ({
  state,
  autocompleteHeight,
  dispatch,
  onAutocompleteChange
}) => {
  const { suggestions } = state;
  const [suggestionsPlacement, setSuggestionsPlacement] = useState('bottom');
  const suggestionsRef = useRef();

  const suggestionsStyle = {
    inset: suggestionsPlacement === 'top'
      ? 'auto auto 0 0'
      : '0 auto auto 0',
    [suggestionsPlacement === 'top'
      ? 'marginBottom'
      : 'marginTop']: '55px',
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      const viewPortHeight = window.innerHeight;
      const { bottom, height } = suggestionsRef.current.getBoundingClientRect();

      setSuggestionsPlacement((placement) => {
        const bottomCoordinate = placement === 'top' ? bottom + autocompleteHeight + height  : bottom;

        return (viewPortHeight - bottomCoordinate) > 0 ? 'bottom' : 'top';
      });
    };

    handleScroll();
    document.addEventListener('wheel', handleScroll);

    return () => document.removeEventListener('wheel', handleScroll);
  }, [autocompleteHeight])

  return (
    <div
      ref={suggestionsRef}
      style={suggestionsStyle}
      className="suggestions">
      {suggestions.length ? (
        suggestions.map(item => (
          <Suggestion
            key={item.label}
            item={item}
            dispatch={dispatch}
            onAutocompleteChange={onAutocompleteChange}
          />
        ))
      ) : (
        <div className="suggestion">
          No options
        </div>
      )}
    </div>
  );
};
