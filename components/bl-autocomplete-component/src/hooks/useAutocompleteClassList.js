import { useMemo } from 'react';

export const useAutocompleteClassList = props => {
  const {
    classList,
    autocompleteValue,
    isAutocompleteActive,
  } = props;

  const classes = useMemo(() => {
    const listOfClasses = ['bl-customComponent-autocomplete', ...classList];

    if (autocompleteValue) {
      classes.push('has-clear-button');
    }

    if (isAutocompleteActive) {
      classes.push('autocomplete-focused');
    }

    return listOfClasses.join(' ');
  }, []);

  return classes;
};
