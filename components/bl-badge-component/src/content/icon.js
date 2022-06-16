import { useMemo } from 'react';

export function Icon({ icon, fontSize }) {
  const styles = useMemo(() => ({
    fontSize,
  }), []);
  
  if (!icon) {
    return null;
  }

  return (
    <i
      className="content-icon material-icons-round"
      aria-hidden="true"
      style={ styles }>
        { icon }
    </i>
  );
}
