const compareCaseInsensitive = (suggestion, query, field) => {
  return suggestion[field]?.toLowerCase().startsWith(query.toLowerCase());
};

export const useTriggers = trigger => (trigger ? stringToList(trigger) : ['@']);

export const filterSuggestions = (suggestions, query, field) => {
  return !query.trim()
    ? suggestions
    : suggestions?.filter(suggestion => compareCaseInsensitive(suggestion, query, field));
};

export const stringToList = text => text.split(',').map(el => el.trim());

export const orderFields = (suggestion, fieldsBlacklistSet) => {
  const fields = Object.keys(suggestion).filter(field => !fieldsBlacklistSet.has(field));
  const imgIndex = fields.indexOf('img');

  if (imgIndex > 0) {
    [fields[0], fields[imgIndex]] = [fields[imgIndex], fields[0]];
  }

  return fields;
};

export const updateSuggestionsMap = (suggestions, setSuggestionsMap) => {
  suggestions?.forEach(el => setSuggestionsMap(prev => prev.set(el.trigger, el.suggestions)));
};
