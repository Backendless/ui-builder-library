export const AlertIcon = (props) => {
  const { svg } = props;

  return (
    <div className="alert__icon">
      {svg}
    </div>
  );
};

export const AlertButton = (props) => {
  const {
    onCloseButtonVisibility,
    styleVariants,
  } = props;

  return (
    <div className="button-container">
      <button onClick={onCloseButtonVisibility} className="alert__close-button" type="button">
        <svg className="alert__close-button-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path fill={styleVariants === 'alert-filled' ? '#fff' : '#000'} d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
    </div>
  );
};

export const AlertTitle = (props) => {
  const { title } = props;

  return (
    <span className="alert__title">
      {title}
    </span>
  );
};
