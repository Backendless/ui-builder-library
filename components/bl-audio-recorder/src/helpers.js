import { Icons } from './icons';

const Labels = {
  START   : 'Start Record',
  STOP    : 'Stop Record',
  PAUSE   : 'Pause',
  RESUME  : 'Resume',
  DOWNLOAD: 'Download Recorded',
};

export const download = (blob, fileName) => {
  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = `${ fileName }.webm`;

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

export class Timer {
  constructor(setTime) {
    this.setTime = setTime;
    this.currentTime = 0;
    this.interval = null;
  }

  static getDisplaySeconds(time) {
    const totalMs = time * 1000;

    return new Date(totalMs).toISOString().slice(14, 19);
  }

  start(state) {
    if (state === 'recording') {
      this.interval = setInterval(() => {
        this.currentTime += 1;

        this.#updateTime();
      }, 1000);
    }
  }

  pause(state) {
    if (state === 'paused') {
      clearInterval(this.interval);
    }
  }

  reset() {
    clearInterval(this.interval);
    this.currentTime = 0;

    this.#updateTime();
  }

  #updateTime() {
    this.setTime(Timer.getDisplaySeconds(this.currentTime));
  }
}

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
