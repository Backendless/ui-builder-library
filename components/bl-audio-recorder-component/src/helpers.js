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
    this.isRunning = false;
    this.currTimer = 0;
    this.interval = undefined;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.currTimer = ++this.currTimer;
        this.updateTime();
      }, 1000);
    }
  }

  pause() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }

  reset() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.currTimer = 0;
    this.updateTime();
  }

  updateTime() {
    this.setTime(this.getDisplaySeconds(this.currTimer));
  }

  getDisplaySeconds(time) {
    const totalMs = time * 1000;

    return new Date(totalMs).toISOString().slice(14, 19);
  }
}
