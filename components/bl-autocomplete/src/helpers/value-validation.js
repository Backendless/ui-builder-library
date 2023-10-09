export function valueValidation(value, options, hasGroup) {
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
