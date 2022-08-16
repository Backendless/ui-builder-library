import { useMemo } from "react";

import { Label } from "./label";
import { Input } from "./input";
import { Fieldset } from "./fieldset";
import { DropDownButton } from "./drop-down-button";

export function SelectField(props) {
  const { type, placeholder, selectValue, isOptionsOpen, isSelectActive, setIsOptionsOpen, setIsSelectActive } = props;

  const selectId = useMemo(() => getId(), []);

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
        />
        <DropDownButton
          isOptionsOpen={ isOptionsOpen }
        />
        <Fieldset
          placeholder={ placeholder }
          selectValue={ selectValue }
          isSelectActive={ isSelectActive }
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
