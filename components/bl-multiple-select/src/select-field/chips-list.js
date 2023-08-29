export function ChipsList({ items, handleRemoveSelectedValue }) {
  return (
    <div className="chips__items">
      { items.map(({ label, objectId }) => (
        <Chip key={ objectId } label={ label } handleRemoveSelectedValue={ handleRemoveSelectedValue } />
      )) }
    </div>
  );
}

function Chip({ label, handleRemoveSelectedValue }) {
  return (
    <div className="chips-item">
      <span className="chips-item__label">{ label }</span>
      <div className="chips-item__icon-container" onClick={ e => handleRemoveSelectedValue(e, label) }>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 0.75L7 6.75" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M7 0.75L1 6.75" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  );
}
