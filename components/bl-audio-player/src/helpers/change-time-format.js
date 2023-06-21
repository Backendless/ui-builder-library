export function changeTimeFormat(sec) {
  if (sec === Infinity) {
    return null;
  }

  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  const time = {
    minutes: minutes < 10 ? `0${ minutes }` : minutes,
    seconds: seconds < 10 ? `0${ seconds }` : seconds,
  };

  return time.minutes + ':' + time.seconds;
}
