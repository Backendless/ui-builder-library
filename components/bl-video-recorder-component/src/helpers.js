export const prepareToRecord = videoRef => {
  if (videoRef.current) {
    videoRef.current.autoplay = true;
    videoRef.current.muted = true;
    videoRef.current.controls = false;
  }
};

export const prepareToView = videoRef => {
  if (videoRef.current) {
    videoRef.current.autoplay = false;
    videoRef.current.muted = false;
    videoRef.current.controls = true;
    videoRef.current.srcObject = null;
    videoRef.current.captureStream = null;
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
    videoRef.current.muted = true;

    return stream;
  } catch (e) {
    console.error('The source of the stream did not select.', e);
  }
};
