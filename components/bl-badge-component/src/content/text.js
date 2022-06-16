import { useMemo } from 'react';

export function Text({ text, fontSize }) {
  const styles = useMemo(() => ({
    fontSize,
  }), []);
  
  if (!text) {
    return null;
  }

  return (
    <span
      className="content-text"
      style={ styles }>
        { text }
    </span>
  );
}
