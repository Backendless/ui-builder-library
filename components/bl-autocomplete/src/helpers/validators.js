export const Validators = {
  options: options => optionsValidator(options),
  value  : (value, options, hasGroup) => valueValidator(value, options, hasGroup),
};

function optionsValidator(options) {
  if (!Array.isArray(options)) {
    console.error('Options should be a list');

    return [];
  }

  return options;
}

function valueValidator(value, options, hasGroup) {
  if (!value) {
    return null;
  }

  let optionsList = options;

  if (hasGroup) {
    optionsList = getChildren(options);
  }

  return optionsList.find(item => item.value === value) || null;
}

function getChildren(options) {
  return options.reduce((acc, item) => [...acc, ...item.children], []);
}
