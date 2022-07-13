navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

export function getUserMedia(element, setPopupOptions, options) {
  const { noYetPermissionOptions, noPermissionOptions } = options;

  setPopupOptions(noYetPermissionOptions);

  const getStream = stream => {
    element.srcObject = stream;
    setPopupOptions(null);
  };

  const noStream = () => {
    setPopupOptions(noPermissionOptions);
  };

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { video: true },
      getStream,
      noStream
    );
  }
}

export const checkMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const stopUserMedia = element => {
  if (element.srcObject.stop) {
    element.srcObject.stop();
  } else {
    element.srcObject.getTracks().forEach(track => track.stop());
  }
};
