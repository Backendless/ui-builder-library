import { ChipsList } from './chips-list';

const CHIPS = 'chips';

export function Input({ type, selectId, selectValue, handleRemoveSelectedValue }) {
  const inputValue = selectValue.map(item => item.label).join(', ');

  return (
    <>
      <div className="input__container">
        { type === CHIPS
          ? <ChipsList items={ selectValue } handleRemoveSelectedValue={ handleRemoveSelectedValue } />
          : <span>{ inputValue }</span>
        }
      </div>
      <input
        type="text"
        id={ selectId }
        autoComplete="off"
        value={ inputValue }
        disabled={ true }
        className="input__field"
      />
    </>
  );
}
