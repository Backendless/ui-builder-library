export const validate = items => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(({ name, goal, progress }) => ({
    id: name,
    name: name,
    goal: Math.max(1, goal),
    progress: Math.max(0, progress),
  }));
};
