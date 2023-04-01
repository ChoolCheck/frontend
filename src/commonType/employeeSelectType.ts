import { ActionMeta, SingleValue } from "react-select";

export interface optionObj {
  label: string;
  color: string;
}

export interface employeeSelect {
  optionList: optionObj[];
  onChangeEmployee: (
    newValue: SingleValue<optionObj>,
    actionMeta: ActionMeta<optionObj>
  ) => void;
}
