export function Image({ imageUrl, imageWidth }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <img
      className="content-image"
      src={ imageUrl }
      style={{
        width: imageWidth+'px',
      }}
      alt=""
    />
  );
}
