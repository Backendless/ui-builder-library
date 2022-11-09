export const validate = items => {
  if (Array.isArray(items)) {
    return items.map(({ name, goal, progress }) => ({
      id: name,
      name: name,
      goal: goal > 0 ? goal : 1,
      progress: progress < 0 ? 0 : progress,
    }));
  }

  return [];
};
