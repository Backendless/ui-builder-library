export function Image({ imageUrl, width }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <img
      className="content-image"
      src={ imageUrl }
      style={{ width }}
    />
  );
}
