import { useEffect, useMemo, useState } from 'react';

import { ImageList, ImageListItem, ImageListItemBar } from './lib/mui';

const { cn } = BackendlessUI.CSSUtils;

const POS_BELOW = 'below';
const TYPE_QUILTED = 'quilted';
const IMAGE_HEIGHT_REDUCTION_FACTOR = 0.7;

export default function ImageListComponent({ component, eventHandlers, elRef }) {
  const {
    style, classList, display, itemData, listVariant, cols, rowHeight,
    gap, showTitleBar, titleBarPosition, titleBarHeight,
  } = component;

  const [items, setItems] = useState([]);
  const imageStyle = useCalculatedImageStyle(showTitleBar, rowHeight, titleBarHeight, titleBarPosition);
  const isQuilted = useMemo(() => listVariant === TYPE_QUILTED, [listVariant]);

  useEffect(() => {
    setItems(itemData);
  }, [itemData]);

  const onItemClick = (event, item) => {
    eventHandlers.onItemClick({ event, item });
  };

  const onTitleClick = (event, title, item) => {
    eventHandlers.onTitleClick({ event, title, item });
  };

  const onImageClick = (event, img, item) => {
    eventHandlers.onImageClick({ event, img, item });
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-image-list', classList) } ref={ elRef } style={ style }>
      <ImageList
        cols={ cols }
        gap={ gap }
        rowHeight={ rowHeight }
        variant={ listVariant }>

        { items.map(item => (
          <ImageListItem
            key={ item.img }
            title={ item.title }
            cols={ isQuilted && item.cols ? item.cols : 1 }
            rows={ isQuilted && item.rows ? item.rows : 1 }
            onClick={ e => onItemClick(e, item) }>

            <img
              src={ item.img }
              alt={ item.title }
              style={ imageStyle }
              onClick={ e => onImageClick(e, item.img, item) }/>

            { showTitleBar && (
              <ImageListItemBar
                position={ titleBarPosition }
                title={ item.title }
                cols={ item.cols }
                rows={ item.rows }
                style={{ height:`${ titleBarHeight }px` }}
                onClick={ e => onTitleClick(e, item.title, item) }/>
            ) }

          </ImageListItem>
        )) }

      </ImageList>
    </div>
  );
}

function useCalculatedImageStyle(showTitleBar, rowHeight, titleBarHeight, titleBarPosition) {
  return useMemo(() => {
    const heightEven = rowHeight * IMAGE_HEIGHT_REDUCTION_FACTOR;
    const deltaHeight = rowHeight - titleBarHeight;
    const deltaHeightEven = deltaHeight * IMAGE_HEIGHT_REDUCTION_FACTOR;
    const isItemBarBelow = showTitleBar && titleBarPosition === POS_BELOW;

    return ({
        '--image-height': isItemBarBelow ? `${ deltaHeight }px` : `${ rowHeight }px`,
        '--image-height-even': isItemBarBelow ? `${ deltaHeightEven }px` : `${ heightEven }px`,
        '--image-height-common': isItemBarBelow ? `calc(100% - ${ titleBarHeight }px)` : '100%',
    });
  }, [showTitleBar, rowHeight, titleBarHeight, titleBarPosition]);
}
