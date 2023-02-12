export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
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

export interface employeeProps {
  name: string;
  role: string;
  color: string;
}

export interface getEmployeeProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface createEmployeeProps {
  name: string;
  role: string;
  color: string;
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}
