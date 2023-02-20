import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

export interface scheduleTotalProps {
  onShowNameButtonClick: (
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShowTotalButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  scheduleTotalList: {
    totalList: {
      day: string;
      date: string;
      name: string;
      time: string;
      totalWorkTime: string;
      backgroundColor: string;
    }[];
    employee: {
      name: string;
      backgroundColor: string;
    }[];
  };
}

export interface scheduleWeeklyProps {
  scheduleWeeklyList: {
    day: string;
    date: string;
    schedule: {
      name: string;
      time: string;
      backgroundColor: string;
    }[];
  }[];
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
