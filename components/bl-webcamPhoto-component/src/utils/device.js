export function getUserMedia(ref, close) {
  const getStream = stream => {
    ref.current.srcObject = stream;
  };
  const noStream = () => {
    alert('For the application to work, you must provide access to the camera');
    close();
  };

  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.webkitGetUserMedia(
      { video: true },
      getStream,
      noStream
    );
  }
}

export const mobileAndTabletCheck = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const stopUserMedia = ref => {
  if (ref.current.srcObject.stop) {
    ref.current.srcObject.stop();
  } else {
    ref.current.srcObject.getTracks().forEach(track => track.stop());
  }
};
