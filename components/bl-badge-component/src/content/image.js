import { useMemo } from 'react';

export function Image({ imageUrl, imageWidth }) {
  const styles = useMemo(() => ({
    width: imageWidth,
  }), []);
  
  if (!imageUrl) {
    return null;
  }

  return (
    <img
      className="content-image"
      src={ imageUrl }
      style={ styles }
    />
  );
}
