import { Icon } from './content/icon';
import { Image } from './content/image';
import { Text } from './content/text';

export function Content({ component, eventHandlers }) {
  const { text, imageUrl, icon, contentFontSize, imageWidth } = component;
  const { onContentClick, onContentMouseOver, onContentMouseOut } = eventHandlers;
  
  return (
    <div
      className="content"
      onClick={ onContentClick }
      onMouseOver={ onContentMouseOver }
      onMouseOut={ onContentMouseOut }
    >
      <Text text={ text } fontSize={ contentFontSize } />
      <Image imageUrl={ imageUrl } imageWidth={ imageWidth } />
      <Icon icon={ icon } fontSize={ contentFontSize } />
    </div>
  );
}
