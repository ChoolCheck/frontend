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

export interface createWorkCheckProps {}

export interface createWorkCheckViewProps
  extends employeeType.employeeList,
    worktypeType.workTypeList {
  workcheckForm: {
    employee: string;
    hours_id: string;
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
}
