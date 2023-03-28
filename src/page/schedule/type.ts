import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

export interface setScheduleListTypes {
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface scheduleObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}

export interface scheduleTotalViewProps {
  onItemClick: (id: number) => (e: React.MouseEvent<HTMLLIElement>) => void;
  onShowNameButtonClick: (
    id: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShowTotalButtonClick: React.MouseEventHandler<HTMLButtonElement>;

  employeeList: employeeType.employeeProps[] | undefined;
  totalScheduleList: scheduleObjProps[] | undefined;

  scheduleToShow: scheduleObjProps[] | undefined;
  onPaginationClick: (
    item: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  page: number;
}
export interface scheduleHeaderProps {
  setSelectedModal: React.Dispatch<React.SetStateAction<string>>;
  leftOrRight: boolean;
  setLeftOrRight: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface scheduleWeeklyProps {
  onItemClick: (id: number) => (e: React.MouseEvent<HTMLLIElement>) => void;
  weekScheduleList: scheduleObjProps[][] | undefined;
}

export interface createScheduleProps extends setScheduleListTypes {
  setScheduleToShow: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface createScheduleViewProps
  extends employeeType.employeeList,
    worktypeType.workTypeList {
  scheduleForm: {
    employee: string;
    hoursId: string;
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

export interface updateScheduleProps extends setScheduleListTypes {
  id: number;
  scheduleDetail: scheduleObjProps | undefined;
  setScheduleToShow: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface updateScheduleViewProps
  extends employeeType.employeeList,
    worktypeType.workTypeList {
  hoursId: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
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
  onClickUpdate: React.MouseEventHandler<HTMLButtonElement>;
}

export interface scheduleDetailProps extends setScheduleListTypes {
  scheduleDetail: scheduleObjProps | undefined;
  setScheduleToShow: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
  setSelectedModal: (value: React.SetStateAction<string>) => void;
}

export interface scheduleDetailViewProps {
  id: number;
  scheduleDetail: scheduleObjProps | undefined;

  onUpdateClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}
