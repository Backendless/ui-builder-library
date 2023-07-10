import { Icons } from './icons';
import { StreamState } from './index';

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
    this.state = StreamState.INACTIVE;
    this.startTime = null;
    this.duration = 0;
  }

  static getDisplaySeconds(time) {
    const totalMs = time * 1000;

    return new Date(totalMs).toISOString().slice(14, 19);
  }

  start() {
    if (this.state !== StreamState.RECORDING) {
      this.state = StreamState.RECORDING;
      this.startTime = Date.now();
      this.duration = 0;

      this.#startCounter();
    }
  }

  pause() {
    if (this.state === StreamState.RECORDING) {
      this.#updateDuration();

      this.state = StreamState.PAUSED;

      clearInterval(this.interval);
    }
  }

  resume() {
    if (this.state === StreamState.PAUSED) {
      this.#startCounter();

      this.state = StreamState.RECORDING;
      this.startTime = Date.now();
    }
  }

  reset() {
    this.#updateDuration();

    this.state = StreamState.INACTIVE;
    this.currentTime = 0;

    clearInterval(this.interval);

    this.#updateTime();
  }

  #updateTime() {
    this.setTime(Timer.getDisplaySeconds(this.currentTime));
  }

  #updateDuration() {
    if (this.state === StreamState.RECORDING) {
      this.duration = this.duration + Date.now() - this.startTime;
    }
  }

  #startCounter() {
    this.interval = setInterval(() => {
      this.currentTime += 1;

      this.#updateTime();
    }, 1000);
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
