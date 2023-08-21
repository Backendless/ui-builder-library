const { cn } = BackendlessUI.CSSUtils;

export default function Skeleton({ component, pods }) {
  const { style, display, classList, isContentVisible, variant, width, height, animation } = component;
  const skeletonContent = pods['skeletonContent'];

  if (!display) {
    return null;
  }

  if (!isContentVisible) {
    return (
      <div
        className={ cn('bl-customComponent-skeleton', variant, animation, classList) }
        style={{ ...style, width: width || '100%', height: height || '100%' }}>
      </div>
    );
  }

  return skeletonContent.render();
}
