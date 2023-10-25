import { useEffect } from 'react';

const SECOND = 1000;
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const useAnimation = (time, elementRef, animationDuration) => {
  useEffect(() => {
    if (elementRef.current.children.length > 1) {
      [...elementRef.current.children].slice(0, -1).forEach(child => {
        child.remove();
      });
    }

    if (time) {
      const oldValue = elementRef.current.firstElementChild;

      if (oldValue) {
        oldValue.className = 'clock__number old';
        oldValue.style.animationDuration = animationDuration + 'ms';
        setTimeout(() => oldValue.remove(), animationDuration - 50);
      }

      const newValue = document.createElement('div');

      newValue.className = 'clock__number new';
      newValue.style.animationDuration = animationDuration + 'ms';
      newValue.innerHTML = time;
      elementRef.current.appendChild(newValue);
    }
  }, [time]);
};

export const getCountdown = countdown => {
  const gap = Math.floor((countdown - Date.now()) / SECOND);

  return timeFormatter(gap);
};

export const getTimer = (startTime, time) => {
  const gap = Math.floor(Date.now() / 1000) - Math.floor(startTime / 1000);

  return timeFormatter(time.all - gap);
};

export const timeFormatter = time => {
  let days = String(Math.floor(time / DAY));
  let hours = String(Math.floor(time / HOUR) % 24);
  let minutes = String(Math.floor(time / MINUTE) % 60);
  let seconds = String(time % 60);

  days = days.length === 1 ? '0' + days : days;
  hours = hours.length === 1 ? '0' + hours : hours;
  minutes = minutes.length === 1 ? '0' + minutes : minutes;
  seconds = seconds.length === 1 ? '0' + seconds : seconds;

  return {
    dayTens    : days[0],
    dayUnits   : days[1],
    hourTens   : hours[0],
    hourUnits  : hours[1],
    minuteTens : minutes[0],
    minuteUnits: minutes[1],
    secondTens : seconds[0],
    secondUnits: seconds[1],
    all        : time,
  };
};
