export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
  id: number;
}

export interface employeeProps {
  name: string;
  role: string;
  color: string;
  id: number;
}

export interface employeeDetailProps {
  employeeDetail: employeeProps | undefined;
  employeeList: employeeProps[] | undefined;
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
  setEmployeeDetail: React.Dispatch<
    React.SetStateAction<employeeProps | undefined>
  >;
}
export interface createEmployeeProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface updateEmployeeProps {
  employeeDetail: employeeProps | undefined;
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
  setEmployeeDetail: React.Dispatch<
    React.SetStateAction<employeeProps | undefined>
  >;
}

export interface createWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}
