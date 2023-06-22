import { Icons } from './icons';

const DefaultValues = {
  START_TEXT   : 'Start Record',
  STOP_TEXT    : 'Stop Record',
  PAUSE_TEXT   : 'Pause',
  RESUME_TEXT  : 'Resume',
  DOWNLOAD_TEXT: 'Download Recorded',
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
    start   : isIcon ? <Record/> : startText || DefaultValues.START_TEXT,
    stop    : isIcon ? <Stop/> : stopText || DefaultValues.STOP_TEXT,
    pause   : isIcon ? <Pause/> : pauseText || DefaultValues.PAUSE_TEXT,
    resume  : isIcon ? <Play/> : resumeText || DefaultValues.RESUME_TEXT,
    download: isIcon ? <Download/> : downloadText || DefaultValues.DOWNLOAD_TEXT,
  });
};
