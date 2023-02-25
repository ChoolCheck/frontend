import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

export interface scheduleObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}

export interface scheduleTotalProps {
  onShowNameButtonClick: (
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShowTotalButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  employeeList: employeeType.employeeProps[] | undefined;
  totalScheduleList: scheduleObjProps[] | undefined;

  scheduleToShow: scheduleObjProps[] | undefined;
}

export interface scheduleWeeklyProps {
  onWeekItemClick: (
    id: number
  ) => (e: React.MouseEventHandler<HTMLLIElement>) => void;
  weekScheduleList: scheduleObjProps[][] | undefined;
}

export interface createScheduleProps {
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
}

export interface createScheduleViewProps
  extends employeeType.employeeList,
    worktypeType.workTypeList {
  scheduleForm: {
    employee: string;
    hours_id: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  onChangeEmployee: React.ChangeEventHandler<HTMLSelectElement>;
  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;

  onChangeWorkType: (
    id: number,
    startTime: string,
    endTime: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartTime: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEndTime: React.ChangeEventHandler<HTMLInputElement>;

  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  onClickCreate: React.MouseEventHandler<HTMLButtonElement>;
}

export interface updateScheduleViewViewProps {}
export interface scheduleDetailProps {}
export interface scheduleDetailViewProps {}
