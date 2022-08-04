const getFirstNumbers = (value, slicer) => {
  const numbers = value.split('').reverse().slice(slicer).reverse().join('');
  const restNumbers = value.split('').slice(numbers.length, numbers.length + 3).reverse();
  const lastNumbers = [];
  
  for (const number of restNumbers) {
    if (number !== '0') {
      lastNumbers.push(number);
    }
  }
  
  return lastNumbers.length ? `${numbers}.${lastNumbers.reverse().join('')}` : numbers;
};

export const decorateNumber = number => {
  if (number.length > 3 && number.length < 7) {
    const firstNumbers = getFirstNumbers(number, 3);
    
    return `${firstNumbers}k`;
  }
  
  if (number.length > 6 && number.length < 10) {
    const firstNumbers = getFirstNumbers(number, 6);
    
    return `${firstNumbers}M`;
  }
  
  if (number.length > 9 && number.length < 13) {
    const firstNumbers = getFirstNumbers(number, 9);
    
    return `${firstNumbers}B`;
  }
  
  if (number.length > 12 && number.length < 16) {
    const firstNumbers = getFirstNumbers(number, 12);
    
    return `${firstNumbers}T`;
  }
  
  return number;
};