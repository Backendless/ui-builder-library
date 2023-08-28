export const IconRow = ({ Empty, Filled, maxValue, value, color, size }) => {
  const resultRow = [];

  for (let i = 1; i <= maxValue; i++) {
    if (i <= value) {
      resultRow.push(<Filled/>);
    } else {
      resultRow.push(<Empty/>);
    }
  }

  return (
    <div className="icon-row">
      {
        resultRow.map((el, key) => (
          <span className="icon" style={{ 'fill': color, 'width': size, 'height': size }} key={ key }>{el}</span>)
        )
      }
    </div>
  );
};
