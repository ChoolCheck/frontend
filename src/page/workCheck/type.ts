import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";
import * as employeeSelectType from "../../commonType/employeeSelectType";

import { ActionMeta, SingleValue } from "react-select";

export interface workcheckObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}
export interface workcheckHeaderProps {
  onChageStartInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChageEndInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetDateResultClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  startTime: string;
  endTime: string;
}

export interface createWorkcheckProps {
  defaultDate: string;
  setWorkcheckToShow?: (
    value: React.SetStateAction<workcheckObjProps[] | undefined>
  ) => void;
}

export interface createWorkCheckViewProps extends worktypeType.workTypeList {
  date: string;
  optionList: employeeSelectType.optionObj[];
  onChangeEmployee: (
    newValue: SingleValue<employeeSelectType.optionObj>,
    actionMeta: ActionMeta<employeeSelectType.optionObj>
  ) => void;
  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;
  onChangeWorkType: (
    id: number,
    startTime: string,
    endTime: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartTime: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEndTime: React.ChangeEventHandler<HTMLInputElement>;

  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  onClickCreate: React.MouseEventHandler<HTMLButtonElement>;
}

export interface workCheckViewProps {
  onItemClick: (id: number) => (e: React.MouseEvent<HTMLLIElement>) => void;
  onShowNameButtonClick: (
    id: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShowTotalButtonClick: React.MouseEventHandler<HTMLButtonElement>;

  employeeList: employeeType.employeeProps[] | undefined;

  workcheckToShow: workcheckObjProps[] | undefined;

  onPaginationClick: (
    item: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;

  page: number;
}

export interface updateWorkcheckProps {
  id: number;
  workcheckDetail: workcheckObjProps | undefined;
  setWorkcheckToShow: (
    value: React.SetStateAction<workcheckObjProps[] | undefined>
  ) => void;
}

export interface updateWorkcheckViewProps extends worktypeType.workTypeList {
  hoursId: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;

  optionList: employeeSelectType.optionObj[];
  defaultValueIndex: number;
  onChangeEmployee: (
    newValue: SingleValue<employeeSelectType.optionObj>,
    actionMeta: ActionMeta<employeeSelectType.optionObj>
  ) => void;

  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;

  onChangeWorkType: (
    id: number,
    startTime: string,
    endTime: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  onChangeStartTime: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEndTime: React.ChangeEventHandler<HTMLInputElement>;

  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  onClickUpdate: React.MouseEventHandler<HTMLButtonElement>;
}

export interface workcheckDetailProps {
  setWorkcheckToShow: (
    value: React.SetStateAction<workcheckObjProps[] | undefined>
  ) => void;
  workcheckDetail: workcheckObjProps | undefined;
}

export interface workcheckDetailViewProps {
  id: number;
  workcheckDetail: workcheckObjProps | undefined;

  onUpdateClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface excelDataProps {
  date: string;
  name: string;
  time: string;
  workType: string | null;
  totalWorkTime: string;
}

export interface ExcelDownloadProps {
  startTime: string;
  endTime: string;
}
