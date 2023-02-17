export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
  id: number;
}

export interface createWorktypeProps {
  worktypeForm: {
    title: string;
    startTime: string;
    endTime: string;
  };
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}

export interface getWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}

export interface deleteWorktypeProps {
  workTypeList: worktypeProps[] | undefined;
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
  id: number;
}

export interface employeeProps {
  name: string;
  role: string;
  color: string;
  id: number;
}

export interface getEmployeeProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface getEmployeeDetailProps {
  setEmployeeDetail: React.Dispatch<
    React.SetStateAction<employeeProps | undefined>
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
  colorCode: string;

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
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
  colorCode: string;

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
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

  employeeList: employeeProps[] | undefined;

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;

  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
}
