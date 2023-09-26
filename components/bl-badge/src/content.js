import { Icon, Image, Text } from './content-types';
import { validate } from './index';

export function Content({ component, eventHandlers }) {
  const { textContent, imageUrl, icon, contentFontSize, imageWidth } = component;
  const { onContentClick, onContentMouseOver, onContentMouseOut } = eventHandlers;

  const fontSize = validate(contentFontSize);
  const contentWidth = validate(imageWidth);

  return (
    <div
      className="content"
      onClick={ onContentClick }
      onMouseOver={ onContentMouseOver }
      onMouseOut={ onContentMouseOut }>
      <Text textContent={ textContent } fontSize={ fontSize }/>
      <Image imageUrl={ imageUrl } width={ contentWidth }/>
      <Icon icon={ icon } fontSize={ fontSize }/>
    </div>
  );
}
