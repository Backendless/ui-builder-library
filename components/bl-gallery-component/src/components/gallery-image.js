export function GalleryImage({ url, imageHeight }) {
  return (
    <>
      <img
        src={ url }
        style={{ height: imageHeight ? imageHeight : '' }}
        className="image"
      />
    </>
  );
}