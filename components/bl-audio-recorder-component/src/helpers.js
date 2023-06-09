import { Icons } from './icons';
import { DefaultValues } from './index';

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
  const { START_TEXT, STOP_TEXT, PAUSE_TEXT, RESUME_TEXT, DOWNLOAD_TEXT } = DefaultValues;

  const isIcon = labelsType === 'icons';

  return ({
    start   : isIcon ? <Record/> : startText || START_TEXT,
    stop    : isIcon ? <Stop/> : stopText || STOP_TEXT,
    pause   : isIcon ? <Pause/> : pauseText || PAUSE_TEXT,
    resume  : isIcon ? <Play/> : resumeText || RESUME_TEXT,
    download: isIcon ? <Download/> : downloadText || DOWNLOAD_TEXT,
  });
};
