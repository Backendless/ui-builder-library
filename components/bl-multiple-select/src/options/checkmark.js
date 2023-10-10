const iconsMap = {
  checked: `M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0
    2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z`,
  unchecked: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
};

export function Checkmark({ checked }) {
  const icon = checked ? iconsMap.checked : iconsMap.unchecked;

  return (
    <span className="checkmark">
      <input type="checkbox" className="checkmark__input" />
      <svg viewBox="0 0 24 24" className="checkmark__icon">
        <path d={ icon } />
      </svg>
    </span>
  );
}
