const INITIAL_REVIEW = [{
  value: 1,
  color: '#ffffff',
}];

export const calculatePercent = (value, maxValue) => value * 100 / maxValue;

export const calculateAverage = reviewData => {
  let totalReviews = 0;
  let totalForFormula = 0;

  reviewData.forEach(({ value }, i, { length }) => {
    totalReviews += value;
    totalForFormula += (length - i) * value;
  });

  return (totalForFormula / totalReviews).toFixed(1);
};

export const calculateTotalReviews = reviewData => (
  reviewData.reduce((accumulator, current) => accumulator + current.value, 0)
);

export const prepareReviewData = (data, color) => {
  if (!Array.isArray(data) || data.length === 0) {
    return INITIAL_REVIEW;
  }

  return data.map(el => typeof el === 'number' ? { value: el, color } : el);
};
