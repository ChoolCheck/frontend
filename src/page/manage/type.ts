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
  workTypeList: worktypeProps[] | undefined;
}
