import { PopupOptionsMap } from '../popup/options';

export function getUserMedia(ref, setPopupOptions) {
  setPopupOptions(PopupOptionsMap.noYetPermission);
  const getStream = stream => {
    ref.current.srcObject = stream;
    setPopupOptions(null);
  };
  const noStream = () => {
    setPopupOptions(PopupOptionsMap.noPermission);
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

export const checkMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const stopUserMedia = ref => {
  if (ref.current.srcObject.stop) {
    ref.current.srcObject.stop();
  } else {
    ref.current.srcObject.getTracks().forEach(track => track.stop());
  }
};
