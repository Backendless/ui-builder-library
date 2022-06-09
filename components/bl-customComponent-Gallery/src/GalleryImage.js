export function GalleryImage({ url, imageHeight, borderRadius }) {
  return (
    <>
      <img
        src={ url }
        style={{ height:imageHeight, width:'auto', borderRadius: borderRadius }}
        className="bl-customComponent-lightBox__image"
      />
    </>
  );
}