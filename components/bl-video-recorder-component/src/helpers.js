export const prepareToRecord = videoRef => {
  if (videoRef) {
    videoRef.autoplay = true;
    videoRef.muted = true;
    videoRef.controls = false;
  }
};

export const prepareToView = videoRef => {
  if (videoRef) {
    videoRef.autoplay = false;
    videoRef.muted = false;
    videoRef.controls = true;
    videoRef.srcObject = null;
    videoRef.captureStream = null;
  }
};

export const download = (blob, fileName) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

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
