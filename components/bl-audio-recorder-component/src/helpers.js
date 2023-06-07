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

export const assignButtonLabels = (component, Icons) => {
  const { controlLabels, startText, stopText, downloadText, pauseText, resumeText } = component;
  const { Record, Pause, Play, Stop, Download } = Icons;

  const isIcon = controlLabels === "icons";

  return ({
    start : isIcon ? <span className="icon"><Record/></span> : startText,
    stop : isIcon ? <span className="icon"><Stop/></span> : stopText,
    pause : isIcon ? <span className="icon"><Pause/></span> : pauseText,
    resume : isIcon ? <span className="icon"><Play/></span> : resumeText,
    download : isIcon ? <span className="icon"><Download/></span> : downloadText,
  });
};
