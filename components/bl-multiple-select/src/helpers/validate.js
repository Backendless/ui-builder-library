export const validateOptions = options => {
  if (!Array.isArray(options)) {
    console.error(
      `The "Multiple Select" component expects a list of options but it gets an ${ typeof options } type.` +
      'Make sure you passed the correct one in Logic or the component Settings.'
    );

    return [];
  }

  return options;
};

export const validateValue = (value, options) => {
  if (!value) {
    return [];
  }

  return options.filter(item => value.includes(item.value));
};
