export function GalleryImage({ url, height }) {
  return (
    <img
      src={ url }
      style={ { height: height } }
      className="image"
    />
  )
}
