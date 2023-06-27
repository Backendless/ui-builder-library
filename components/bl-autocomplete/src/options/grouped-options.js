import { Option } from './option';

export function GroupedOptions({ item, setInputValue, setIsOptionsOpen, setAutocompleteValue, onChange }) {
  return (
    <>
      <div className="groupe-label">{ item.groupLabel }</div>
      { item.children.map(item => (
        <Option
          key={ item.value }
          item={ item }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
          onChange={ onChange }
        />
      )) }
    </>
  );
}
