import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

export interface worktypeProps extends worktypeType.worktypeProps {}

export interface employeeProps extends employeeType.employeeProps {}

export interface employeeDetailProps extends employeeType.employeeList {
  employeeDetail: employeeProps | undefined;
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}
export interface employeeDetailViewProps {
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  employeeDetail: employeeProps | undefined;
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface createEmployeeProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface createEmployeeViewProps {
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeRole: React.ChangeEventHandler<HTMLSelectElement>;
  onClickColor: React.MouseEventHandler<HTMLButtonElement>;
  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  onCreateClick: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
}

export interface updateEmployeeProps {
  employeeDetail: employeeProps | undefined;
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface updateEmployeeViewProps {
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeRole: React.ChangeEventHandler<HTMLSelectElement>;
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickColor: React.MouseEventHandler<HTMLButtonElement>;
  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
  role: string;
  color: string;
}

export interface createWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}
