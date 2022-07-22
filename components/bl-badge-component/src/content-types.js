export function Icon({ icon, fontSize }) {
  if (!icon) {
    return null;
  }

  return (
    <i className="content-icon material-icons bl-icon material-icons-round" aria-hidden="true" style={{ fontSize }}>
      { icon }
    </i>
  );
}

export function Image({ imageUrl, width }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <img className="content-image" src={ imageUrl } style={{ width }}/>
  );
}

export function Text({ textContent, fontSize }) {
  if (!textContent) {
    return null;
  }

  return (
    <span className="content-text" style={{ fontSize }}>{ textContent }</span>
  );
}
