import { useMemo } from 'react';

import { ImageList, ImageListItem, ImageListItemBar } from './lib/mui';

const { cn } = BackendlessUI.CSSUtils;

const POS_BELOW = 'below';
const TYPE_QUILTED = 'quilted';
const IMAGE_HEIGHT_REDUCTION_FACTOR = 0.7;

export default function ImageListComponent({ component, eventHandlers, elRef }) {
  const {
    style, classList, display, itemsData, layout, cols, rowHeight, gap, showTitleBar, titleBarPosition, titleBarHeight,
  } = component;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-image-list', classList) } ref={ elRef } style={ style }>
      <ImageList cols={ cols } gap={ gap } rowHeight={ rowHeight } variant={ layout }>

        { itemsData?.map((item, index) => (
          <Item
            key={ index }
            item={ item }
            layout={ layout }
            rowHeight={ rowHeight }
            showTitleBar={ showTitleBar }
            titleBarPosition={ titleBarPosition }
            titleBarHeight={ titleBarHeight }
            eventHandlers={ eventHandlers }
          />
        )) }
      </ImageList>
    </div>
  );
}

function Item({ item, layout, rowHeight, showTitleBar, titleBarPosition, titleBarHeight, eventHandlers }) {
  const { img, title, rows, cols } = item;
  const { onItemClick, onTitleClick, onImageClick } = eventHandlers;

  const imageStyle = useCalculatedImageStyle(showTitleBar, rowHeight, titleBarHeight, titleBarPosition);
  const isQuilted = useMemo(() => layout === TYPE_QUILTED, [layout]);

  return (
    <ImageListItem
      title={ title }
      cols={ isQuilted && cols ? cols : 1 }
      rows={ isQuilted && rows ? rows : 1 }
      onClick={ event => onItemClick({ event, item }) }>

      <img src={ img } alt={ title } style={ imageStyle } onClick={ event => onImageClick({ event, img, item }) }/>

      { showTitleBar && (
        <ImageListItemBar
          position={ titleBarPosition }
          title={ title }
          cols={ cols }
          rows={ rows }
          style={{ height: `${ titleBarHeight }px` }}
          onClick={ event => onTitleClick({ event, title, item }) }
        />
      ) }
    </ImageListItem>
  );
}

function useCalculatedImageStyle(showTitleBar, rowHeight, titleBarHeight, titleBarPosition) {
  return useMemo(() => {
    const heightEven = rowHeight * IMAGE_HEIGHT_REDUCTION_FACTOR;
    const deltaHeight = rowHeight - titleBarHeight;
    const deltaHeightEven = deltaHeight * IMAGE_HEIGHT_REDUCTION_FACTOR;
    const isItemBarBelow = showTitleBar && titleBarPosition === POS_BELOW;

    return ({
      '--image-height'       : isItemBarBelow ? `${ deltaHeight }px` : `${ rowHeight }px`,
      '--image-height-even'  : isItemBarBelow ? `${ deltaHeightEven }px` : `${ heightEven }px`,
      '--image-height-common': isItemBarBelow ? `calc(100% - ${ titleBarHeight }px)` : '100%',
    });
  }, [showTitleBar, rowHeight, titleBarHeight, titleBarPosition]);
}
