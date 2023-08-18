import { useEffect, useRef, useState } from 'react';

import FALLBACK_IMAGE from './assets/fallback-image.jpg';
import { updateImage, uploadImage } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function AvatarComponent({ component, eventHandlers, elRef }) {
  const { onUpload } = eventHandlers;
  const {
    classList, display, style, readOnly, shape, imageUrl, width, height, emptyLabel, changeLabel, smartImageFit,
  } = component;

  const [imageSource, setImageSource] = useState(imageUrl);
  const [imageDimensions, setImageDimensions] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    if (imageUrl !== imageSource) {
      updateImage(imageUrl, smartImageFit, setImageDimensions, setImageSource);
    }
  }, [imageUrl]);

  const onClick = () => {
    if (!readOnly && inputRef.current) {
      inputRef.current.click();
    }
  };

  const styles = {
    minHeight    : height,
    pointerEvents: readOnly && 'none',
    width, height, ...style,
  };

  Object.assign(component, {
    removeImage: () => setImageSource(readOnly ? FALLBACK_IMAGE : ''),
    uploadImage: () => inputRef.current?.click(),
  });

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-avatar', shape, classList) } style={ styles }>
      <ImagePreview
        imageSource={ readOnly ? (imageSource || FALLBACK_IMAGE) : imageSource }
        component={ component }
        eventHandlers={ eventHandlers }
        dimensions={ imageDimensions }
      />

      { !readOnly && (
        <div className={ cn('avatar-label', { hide: imageSource }) } onClick={ onClick }>
          { imageSource ? changeLabel : emptyLabel }
        </div>
      ) }

      <input
        ref={ inputRef }
        type="file"
        accept="image/*"
        aria-label="upload-input"
        onChange={ event => uploadImage(event, setImageSource, setImageDimensions, smartImageFit, onUpload) }
        hidden
      />
    </div>
  );
}

function ImagePreview({ imageSource, component, eventHandlers, dimensions }) {
  const { alt } = component;
  const { onError, onChange } = eventHandlers;
  const { height, width } = dimensions;

  useEffect(() => {
    component.imageUrl = imageSource;

    onChange({ imageSource });
  }, [imageSource]);

  if (!imageSource) {
    return null;
  }

  return (
    <img
      className="avatar-image"
      src={ imageSource }
      alt={ alt }
      width={ width }
      height={ height }
      onError={ onError }
    />
  );
}
