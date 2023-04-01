import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";

import { ActionMeta, SingleValue } from "react-select";

export interface optionObj {
  label: string;
  color: string;
}
interface employeeSelect {
  optionList: optionObj[];
  onChangeEmployee: (
    newValue: SingleValue<optionObj>,
    actionMeta: ActionMeta<optionObj>
  ) => void;
}
const EmployeeSelect = ({ optionList, onChangeEmployee }: employeeSelect) => {
  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 8,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 15,
      width: 15,
    },
  });

  const colorStyles: StylesConfig<optionObj> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      boxShadow: "none",
      borderRadius: "10px",
      borderColor: "gray",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: `${color.alpha(0.2)}`,
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.2).css()
            : "white",
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("white") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  return (
    <div>
      <Select
        defaultValue={optionList[0]}
        options={optionList}
        styles={colorStyles}
        isMulti={false}
        onChange={onChangeEmployee}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default EmployeeSelect;
