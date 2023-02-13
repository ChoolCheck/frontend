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
export interface createEmployeeProps {
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeProps[] | undefined>
  >;
}

export interface createWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}
