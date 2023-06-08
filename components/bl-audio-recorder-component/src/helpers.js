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
