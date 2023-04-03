import { ActionMeta, SingleValue } from "react-select";

export interface optionObj {
  label: string;
  color: string;
  isDisabled?: boolean;
}

export interface employeeSelect {
  optionList: optionObj[];
  onChangeEmployee: (
    newValue: SingleValue<optionObj>,
    actionMeta: ActionMeta<optionObj>
  ) => void;
  defaultValueIndex?: number;
}
