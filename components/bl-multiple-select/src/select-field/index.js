import { useMemo } from "react";

import { Label } from "./label";
import { Input } from "./input";
import { Fieldset } from "./fieldset";
import { DropDownButton } from "./drop-down-button";

export function SelectField(props) {
  const {
    type, placeholder, selectValue, isOptionsOpen, isSelectActive,
    setIsOptionsOpen, setIsSelectActive, handleRemoveSelectedValue
  } = props;

  const selectId = useMemo(() => BackendlessUI.UUID.short(), []);

  const handleClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
    setIsSelectActive(true);
  };

  return (
    <div className="multiple-select" onClick={ handleClick }>
      <Label
        selectId={ selectId }
        placeholder={ placeholder }
        selectValue={ selectValue }
        isSelectActive={ isSelectActive }
      />
      <div className="multiple-select__container">
        <Input
          type={ type }
          selectId={ selectId }
          selectValue={ selectValue }
          handleRemoveSelectedValue={ handleRemoveSelectedValue }
        />
        <DropDownButton isOptionsOpen={ isOptionsOpen } />
        <Fieldset placeholder={ placeholder } selectValue={ selectValue } isSelectActive={ isSelectActive } />
      </div>
    </div>
  );
};
