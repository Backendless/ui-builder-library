export function Text({ textContent, fontSize }) {
  if (!textContent) {
    return null;
  }

  return (
    <span className="content-text" style={{ fontSize }}>
      { textContent }
    </span>
  );
}
