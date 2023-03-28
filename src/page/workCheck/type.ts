import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

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
  onClickGetFile: () => void;
}

export interface createWorkCheckProps {
  setPaginationFocus: React.Dispatch<React.SetStateAction<string>>;
}
export interface createWorkCheckViewProps
  extends employeeType.employeeList,
    worktypeType.workTypeList {
  workcheckForm: {
    employee: string;
    hoursId: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  onChangeEmployee: React.ChangeEventHandler<HTMLSelectElement>;
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
  setPaginationFocus: React.Dispatch<React.SetStateAction<string>>;
}

export interface updateWorkcheckViewProps
  extends employeeType.employeeList,
    worktypeType.workTypeList {
  hoursId: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  onChangeEmployee: React.ChangeEventHandler<HTMLSelectElement>;
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
  setPaginationFocus: React.Dispatch<React.SetStateAction<string>>;
}

export interface workcheckDetailViewProps {
  id: number;
  workcheckDetail: workcheckObjProps | undefined;

  onUpdateClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}
