const compareCaseInsensitive = (suggestion, query) => {
  return suggestion.field.toLowerCase().startsWith(query.toLowerCase());
};

export const useTriggers = trigger => (trigger ? stringToList(trigger) : ['@']);

export const filterSuggestions = (suggestions, query) => {
  return !query.trim()
    ? suggestions
    : suggestions.filter(suggestion => compareCaseInsensitive(suggestion, query));
};

export const stringToList = text => (text.split(',').map(el => el.trim()));

export const orderFields = (suggestion, fieldsBlacklistSet) => {
  const fields = Object.keys(suggestion).filter(field => !fieldsBlacklistSet.has(field));
  const img = 'img';
  const imgIndex = fields.indexOf(img);

  if (imgIndex > 0) {
    [fields[0], fields[imgIndex]] = [fields[imgIndex], fields[0]];
  }

  return fields;
};
