export function Text({ text, fontSize }) {
  if (!text) {
    return null;
  }

  return (
    <span className="content-text" style={{ fontSize }}>
      { text }
    </span>
  );
}
