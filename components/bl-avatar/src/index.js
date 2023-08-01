import { useEffect, useRef, useState } from 'react';

import { defineImageDimensions, uploadImage } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function AvatarComponent({ component, eventHandlers, elRef }) {
  const { classList, display, style, readOnly, shape, imageUrl, width, height, emptyLabel, changeLabel } = component;
  const { onUpload } = eventHandlers;

  const [imageSource, setImageSource] = useState(imageUrl);

  const inputRef = useRef(null);

  useEffect(() => {
    setImageSource(imageUrl);
  }, [imageUrl]);

  const onClick = () => {
    if (!readOnly && inputRef.current) {
      inputRef.current.click();
    }
  };

  const styles = { minHeight: height, width, height, ...style };

  Object.assign(component, {
    removeImage: () => setImageSource(''),
    uploadImage: () => inputRef.current?.click(),
  });

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-avatar', shape, classList) } style={ styles }>
      <ImagePreview imageSource={ imageSource } component={ component } eventHandlers={ eventHandlers }/>

      { (!readOnly || !imageSource) && (
        <div className={ cn('avatar-label', { hide: imageSource }) } onClick={ onClick }>
          { imageSource ? changeLabel : emptyLabel }
        </div>
      ) }

      <input
        ref={ inputRef }
        type="file"
        accept="image/*"
        aria-label="upload-input"
        onChange={ event => uploadImage(event, setImageSource, onUpload) }
        hidden
      />
    </div>
  );
}

function ImagePreview({ imageSource, component, eventHandlers }) {
  const { alt, smartImageFit } = component;
  const { onError, onChange } = eventHandlers;

  const [{ height, width }, setDimensions] = useState({});

  useEffect(() => {
    if (imageSource) {
      defineImageDimensions(imageSource, smartImageFit, setDimensions);
    }

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
