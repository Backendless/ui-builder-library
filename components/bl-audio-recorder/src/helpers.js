import { Icons } from './icons';

export const download = (blob, fileName, fileType) => {
  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = `${ fileName }.${ fileType.toLowerCase() }`;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
};

export const captureMediaDevices = async mediaConstraints => {
  try {
    return await navigator.mediaDevices.getUserMedia(mediaConstraints);
  } catch (e) {
    console.error('The source of the stream did not select.', e);
  }
};

export const prepareLabel = component => {
  const { labelsType, startText, stopText, downloadText, pauseText, resumeText } = component;
  const { Record, Pause, Play, Stop, Download } = Icons;

  const isIcon = labelsType === 'icons';

  return ({
    start   : isIcon ? <Record/> : startText,
    stop    : isIcon ? <Stop/> : stopText,
    pause   : isIcon ? <Pause/> : pauseText,
    resume  : isIcon ? <Play/> : resumeText,
    download: isIcon ? <Download/> : downloadText,
  });
};
