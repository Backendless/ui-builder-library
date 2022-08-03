import { useMemo } from "react";

import { Label } from "./label";
import { Input } from "./input";
import { Fieldset } from "./fieldset";
import { DropDownButton } from "./drop-down-button";

export function MultipleSelectField(props) {
  const {
    placeholder,
    isOptionsOpen,
    multipleSelectValue,
    typeOfMultipleSelect,
    isMultipleSelectActive,
    setIsOptionsOpen,
    setIsMultipleSelectActive
  } = props;

  const multipleSelectId = useMemo(() => getId(), []);

  const handleClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
    setIsMultipleSelectActive(true);
  };

  return (
    <div className="multiple-select" onClick={ handleClick }>
      <Label
        placeholder={ placeholder }
        multipleSelectId={ multipleSelectId }
        multipleSelectValue={ multipleSelectValue }
        isMultipleSelectActive={ isMultipleSelectActive }
      />
      <div className="multiple-select__container">
        <Input
          multipleSelectId={ multipleSelectId }
          multipleSelectValue={ multipleSelectValue }
          typeOfMultipleSelect={ typeOfMultipleSelect }
        />
        <DropDownButton
          isOptionsOpen={ isOptionsOpen }
        />
        <Fieldset
          placeholder={ placeholder }
          multipleSelectValue={ multipleSelectValue }
          isMultipleSelectActive={ isMultipleSelectActive }
        />
      </div>
    </div>
  );
};

const getId = () => {
  const chr4 = () => Math.random().toString(16).slice(-4);
  const chr8 = () => `${chr4()}${chr4()}`;

  return `${chr8()}${chr8()}`;
};
