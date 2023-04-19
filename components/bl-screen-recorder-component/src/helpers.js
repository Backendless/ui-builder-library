export const prepareToRecord = (videoRef, startRef, stopRef) => {
  if (videoRef) {
    Object.assign(videoRef, {
      autoplay: true,
      muted   : true,
      controls: false,
    });
  }

  if (startRef && stopRef) {
    startRef.disabled = true;
    stopRef.disabled = false;
  }

};

export const prepareToView = (videoRef, startRef, stopRef, downloadRef) => {
  if (videoRef) {
    Object.assign(videoRef, {
      autoplay     : false,
      muted        : false,
      controls     : true,
      srcObject    : null,
      captureStream: null,
    });
  }

  if (startRef && stopRef && downloadRef) {
    startRef.disabled = false;
    stopRef.disabled = true;
    downloadRef.disabled = false;
  }
};

export const download = (blob, fileName, fileType) => {
  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = `${ fileName }.${ fileType }`;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
};

export const captureMediaDevices = async (mediaConstraints, videoRef) => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints);

    videoRef.current.srcObject = stream;

    return stream;
  } catch (e) {
    console.error('The source of the stream did not select.', e);
  }
};

export const ensureMeasure = dimension => {
  return String(Number(dimension)) === dimension || !isNaN(dimension) ? dimension + 'px' : dimension;
};
