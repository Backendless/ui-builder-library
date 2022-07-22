import { useMemo } from 'react';

export const useAutocompleteClassList = props => {
  const { disabled, classList, autocompleteValue, autocompleteVariant, isAutocompleteActive } = props;

  return useMemo(() => {
    const listOfClasses = ['bl-customComponent-autocomplete', autocompleteVariant, ...classList];

    if (autocompleteValue) {
      listOfClasses.push('has-clear-button');
    }

    if (isAutocompleteActive) {
      listOfClasses.push('autocomplete-focused');
    }
    
    if (disabled) {
      listOfClasses.push('disabled');
    }

    return listOfClasses.join(' ');
  }, [classList, autocompleteValue, isAutocompleteActive]);
};
