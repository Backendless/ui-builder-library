export const validate = items => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items;
};
