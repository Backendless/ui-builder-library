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

export const timeConverter = (time) => {
  const totalMs = time * 1000;

  return new Date(totalMs).toISOString().slice(14, 19);
}

export const simpleTimer = (state, recording, setTime, setTimerInterval, timerInterval) => {
  if (state === recording) {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000)

    setTimerInterval(interval);
  } else {
    clearInterval(timerInterval);
  }
}
