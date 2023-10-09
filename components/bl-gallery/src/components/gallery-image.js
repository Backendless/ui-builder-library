export function GalleryImage({ url, height }) {
  return (
    <img
      src={ url }
      alt="gallery item"
      style={{ height: height }}
      className="image"
    />
  )
}
