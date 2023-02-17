export const enumColor = {
  RED: "FFADAD",
  ORANGE: "FFD6A5",
  YELLOW: "FDFFB6",
  GREEN: "CAFFBF",
  LIGHT_BLUE: "9BF6FF",
  BLUE: "A0C4FF",
  PURPLE: "BDB2FF",
  PINK: "FFC6FF",
  GRAY: "DEDEDE",
} as const;

export const enumRole = {
  FULL_TIME: "직원",
  PART_TIME: "알바",
  MANAGER: "매니저",
} as const;

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
  employeeDetail: employeeProps | undefined;
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
