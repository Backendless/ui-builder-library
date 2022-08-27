import { Parallax } from './react-parallax.min';

const { cn } = BackendlessUI.CSSUtils;

export default function ParallaxComponent({ component }) {
  const { style, display, classList, image, strength, title, text } = component;

  if (!display) {
    return null;
  }

  return (
    <Parallax
      className={ cn('bl-customComponent-parallax', 'parallax', classList) }
      style={ style }
      bgImage={ image }
      strength={ strength }
      contentClassName="parallax__content"
      bgClassName="parallax__image">
      { title && (
        <h3 className="parallax__title">{ title }</h3>
      ) }

      { text && (
        <p className="parallax__text">{ text }</p>
      ) }
    </Parallax>
  );
}
