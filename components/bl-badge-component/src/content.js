import { Icon, Image, Text } from './content-types';

export function Content({ component, eventHandlers }) {
  const { textContent, imageUrl, icon, contentFontSize, imageWidth } = component;
  const { onContentClick, onContentMouseOver, onContentMouseOut } = eventHandlers;

  return (
    <div
      className="content"
      onClick={ onContentClick }
      onMouseOver={ onContentMouseOver }
      onMouseOut={ onContentMouseOut }>
      <Text textContent={ textContent } fontSize={ contentFontSize }/>
      <Image imageUrl={ imageUrl } width={ imageWidth }/>
      <Icon icon={ icon } fontSize={ contentFontSize }/>
    </div>
  );
}
