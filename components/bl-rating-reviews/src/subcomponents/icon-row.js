export const IconRow = ({ Empty, Filled, maxValue, value, color, size }) => {
  const styleObject = { 'fill': color, 'width': size, 'height': size };
  const resultRow = Array.from({ length: maxValue }, (_, i) => {
    if (i + 1 <= value) {
      return (<Filled key={ i }/>);
    }

    return (<Empty key={ i }/>);
  });

  return (
    <div className="icon-row">
      { resultRow.map((el, key) => (
        <span className="icon" style={ styleObject } key={ key }>{ el }</span>)
      ) }
    </div>
  );
};
