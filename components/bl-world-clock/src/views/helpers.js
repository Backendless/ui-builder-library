import { useReducer, useState } from 'react';

export function Label({ content }) {
  return (
    <div className="clock-label">
      <span className="clock-label-text">{ content }</span>
    </div>
  );
}

export function useObjectState(initialState) {
  initialState = useState(initialState)[0];

  return useReducer((state, patch) => {
    const changes = patch instanceof Function ? patch(state) : patch;

    const changed = Object.entries(changes).some(([key, value]) => state[key] !== value);

    return changed ? { ...state, ...changes } : state;
  }, initialState || {});
}
