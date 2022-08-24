const { cn } = BackendlessUI.CSSUtils;

export default function Skeleton({ component }) {
  const { display, classList, variant, width, height, animation } = component;

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-skeleton', `${ variant }`, `${ animation }`, classList) }
      style={ { width: width ? width : '100%', height: height ? height : '100%' } }>
    </div>
  );
}
