import { useState } from 'react';

import { Dropzone, FileMosaic, FullScreen, ImagePreview, VideoPreview } from './lib/files-ui.min';

import { ensureFileType, useDropzone } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

const FileTypes = {
  IMG  : 'image.*',
  VIDEO: 'video.*',
};

export default function DropzoneComponent({ component, eventHandlers }) {
  const { display, classList, style, label, language, showInfoLayer, activeItems } = component;
  const { themeColor, maxFiles, maxFileSize, minHeight, borderWidth, borderStyle, borderColor } = component;
  const { footerVisibility, headerVisibility, downloadButtonVisibility, cleanButtonVisibility, preview } = component;
  const { acceptedFileTypes, onDropBehaviour, clickable, autoClean, disableRipple, disabled } = component;

  const [imageSrc, setImageSrc] = useState();
  const [videoSrc, setVideoSrc] = useState();

  const { files, updateFiles, handleDelete, handleClean } = useDropzone(component, eventHandlers);

  const handleSee = imageSource => setImageSrc(imageSource);
  const handleWatch = videoSource => setVideoSrc(videoSource);

  const borderStyles = {
    borderWidth: normalizeDimensionValue(borderWidth),
    borderStyle,
    borderColor,
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-dropzone', classList) } style={ style }>
      <Dropzone
        style={ borderStyles }
        onChange={ updateFiles }
        value={ files }
        clickable={ clickable }
        autoClean={ autoClean }
        onClean={ cleanButtonVisibility ? handleClean : false }
        accept={ acceptedFileTypes }
        maxFileSize={ maxFileSize }
        maxFiles={ maxFiles }
        label={ label }
        minHeight={ normalizeDimensionValue(minHeight) }
        localization={ language }
        footer={ footerVisibility }
        header={ headerVisibility }
        behaviour={ onDropBehaviour }
        color={ themeColor }
        disableRipple={ disableRipple }
        disabled={ disabled }>

        { files?.map(file => (
          <FileMosaic
            { ...file }
            key={ file.id }
            onDelete={ handleDelete }
            onSee={ preview ? handleSee : undefined }
            onWatch={ preview ? handleWatch : undefined }
            alwaysActive={ activeItems }
            localization={ language }
            preview={ preview }
            info={ showInfoLayer }
            downloadUrl={ downloadButtonVisibility ? URL.createObjectURL(file.file) : undefined }
            imageUrl={ ensureFileType(file, FileTypes.IMG) } // fix fullscreen preview for not valid image files
            videoUrl={ ensureFileType(file, FileTypes.VIDEO) } // fix fullscreen preview for video files
          />
        )) }
      </Dropzone>
      <FullScreen open={ imageSrc } onClose={ handleSee }>
        <ImagePreview src={ imageSrc }/>
      </FullScreen>
      <FullScreen open={ videoSrc } onClose={ handleWatch }>
        <VideoPreview src={ videoSrc } autoPlay controls/>
      </FullScreen>
    </div>
  );
}
