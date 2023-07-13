import { Icons } from './icons';

const Labels = {
  START   : 'Start Record',
  STOP    : 'Stop Record',
  PAUSE   : 'Pause',
  RESUME  : 'Resume',
  DOWNLOAD: 'Download Recorded',
};

export const download = (blob, fileName, fileNameHasTimestamp, recordDate) => {
  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = getFileName(fileName, fileNameHasTimestamp, recordDate);

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
    start   : isIcon ? <Record/> : startText || Labels.START,
    stop    : isIcon ? <Stop/> : stopText || Labels.STOP,
    pause   : isIcon ? <Pause/> : pauseText || Labels.PAUSE,
    resume  : isIcon ? <Play/> : resumeText || Labels.RESUME,
    download: isIcon ? <Download/> : downloadText || Labels.DOWNLOAD,
  });
};

const getFileName = (fileName, fileNameHasTimestamp, recordDate) => {
  if (fileNameHasTimestamp) {
    const date = new Date(recordDate).toISOString();

    return `${ fileName }${ date }.webm`;
  }

  return `${ fileName }.webm`;
};
