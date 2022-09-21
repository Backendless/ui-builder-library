import { ChipList } from './chip-list';

export function Input({ type, selectId, selectValue }) {
  const inputValue = selectValue.map(item => item.label).join(', ');
  
  return (
    <>
      <div className="input__container">
        { type === "chip" ? <ChipList items={ selectValue } /> : <span>{ inputValue }</span> }
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
};
