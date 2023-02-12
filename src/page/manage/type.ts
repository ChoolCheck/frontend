export interface manageEmployeeProps {
  employeeList: {
    name: string;
    backgroundColor: string;
    rank: string;
  }[];
}
export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
}
export interface manageWorkProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
  workTypeList: worktypeProps[] | undefined;
}
export interface employeeForm {
  name: string;
  role: string;
  color: string;
}
export interface createWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}
