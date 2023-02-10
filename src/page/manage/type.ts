export interface manageEmployeeProps {
  employeeList: {
    name: string;
    backgroundColor: string;
    rank: string;
  }[];
}

export interface manageWorkProps {
  workTypeList: {
    workType: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface worktypeProps {
  workType: string;
  startTime: string;
  endTime: string;
}
