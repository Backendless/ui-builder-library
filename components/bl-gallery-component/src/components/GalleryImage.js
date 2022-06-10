export function GalleryImage({ url, imageHeight, borderRadius }) {
  return (
    <>
      <img
        src={ url }
        style={{ height:imageHeight, borderRadius: borderRadius }}
        className="image"
      />
    </>
  );
}