import { useMemo } from 'react';

export const useGridMarks = gridMarks => useMemo(() => {
  const marks = [0];
  const spredNumber = 100 / b;
  let currentNumber = spredNumber;

  while(currentNumber <= 100) {
    marks.push(currentNumber);
    currentNumber += spredNumber;
  }

  return marks;
}, [gridMarks]);
