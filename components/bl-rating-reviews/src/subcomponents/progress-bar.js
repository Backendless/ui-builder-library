export const ProgressBar = ({ value, maxValue, color, eventHandlers: { getRatingScore } }) => {
  const percent = `${ Math.round(value * 100 / maxValue) }%`;

  const onClickHandler = () => getRatingScore({ score: value });

  return (
    <div className="progress-bar" onClick={ onClickHandler }>
      <div className="progress-bar-fill" style={ { 'width': percent, 'background': color } }/>
    </div>
  );
};
