import * as employeeType from "../../commonType/employee";
import * as workType from "../../commonType/worktype";

export interface createWorktypeProps {
  worktypeForm: {
    title: string;
    startTime: string;
    endTime: string;
  };
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<workType.worktypeProps[] | undefined>
  >;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}

export interface getWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<workType.worktypeProps[] | undefined>
  >;

  hours?: string;
  setHoursid?: React.Dispatch<React.SetStateAction<string>>;
}

export interface deleteWorktypeProps {
  workTypeList: workType.worktypeProps[] | undefined;
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<workType.worktypeProps[] | undefined>
  >;
  id: number;
}

export interface getEmployeeProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;
  color?: string;
  employee?: string;
  setEmployeeId?: React.Dispatch<React.SetStateAction<string>>;
}

export interface getEmployeeDetailProps {
  setEmployeeDetail: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps | undefined>
  >;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  id: number;
}

export interface createEmployeeProps {
  name: string;
  role: string;
  color: string;

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}
export interface updateEmployeeProps {
  id: number;
  name: string;
  role: string;
  color: string;

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
}

export interface deleteEmployeeProps {
  id: number;

  employeeList: employeeType.employeeProps[] | undefined;

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;

  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
}

export interface integratedManageRenderProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<workType.worktypeProps[] | undefined>
  >;
}
