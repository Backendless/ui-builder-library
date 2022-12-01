import { useEffect } from 'react';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const useAnimation = (time, element, animationDuration) => {
  useEffect(() => {
    if (element.current.children.length > 1) {
      [...element.current.children].slice(0, -1).forEach((child) => {
        child.remove();
      });
    }

    if (time) {
      const oldValue = element.current.firstElementChild;

      if (oldValue) {
        oldValue.className = 'clock__number old';
        oldValue.style.animationDuration = animationDuration + 'ms';
        setTimeout(() => oldValue.remove(), animationDuration - 50);
      }

      const newValue = document.createElement('div');

      newValue.className = 'clock__number new';
      newValue.style.animationDuration = animationDuration + 'ms';
      newValue.innerHTML = time;
      element.current.appendChild(newValue);
    }
  }, [time]);
};

export const getTime = () => {
  let [hours, minutes, seconds] = new Date().toLocaleTimeString().split(':');

  return {
    hourTens   : hours[0],
    hourUnits  : hours[1],
    minuteTens : minutes[0],
    minuteUnits: minutes[1],
    secondTens : seconds[0],
    secondUnits: seconds[1]
  };
};

export const getTimer = (timerDate) => {
  const gap = timerDate - Date.now();

  let days = String(Math.floor(gap / DAY));
  let hours = String(Math.floor(gap / HOUR) % 24);
  let minutes = String(Math.floor(gap / MINUTE) % 60);
  let seconds = String(Math.floor(gap / SECOND) % 60);

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
    all        : Number(days + hours + minutes + seconds)
  };
};
