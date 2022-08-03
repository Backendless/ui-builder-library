import { Chip } from './chip';

export function Input(props) {
  const { multipleSelectId, multipleSelectValue, typeOfMultipleSelect } = props;
  const inputValue = multipleSelectValue.map(item => item.label).join(', ');
  
  return (
    <>
      <div
        className="input__container">
        { typeOfMultipleSelect === "chip" ?
          <div className="chip__items">
            { multipleSelectValue.map(({ label, objectId }) => (
              <Chip key={ objectId } label={ label } />
            )) }
          </div>
          :
          <span>{ inputValue }</span>
        }
      </div>
      <input
        type="text"
        id={ multipleSelectId }
        autoComplete="off"
        value={ inputValue }
        disabled={ true }
        className="input__field"
      />
    </>
  );
};