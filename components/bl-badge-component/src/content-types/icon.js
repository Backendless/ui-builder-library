export function Icon({ icon, fontSize }) {
  if (!icon) {
    return null;
  }

  return (
    <i
      className="content-icon material-icons-round"
      aria-hidden="true"
      style={{ fontSize }}>
      { icon }
    </i>
  );
}
