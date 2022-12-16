export const validate = items => {
  if (!Array.isArray(items)) {
    console.error("Options should be a list");

    return [];
  }

  return items;
};
