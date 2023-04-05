import * as paginationType from "../../commonType/pagination";
import * as employeeType from "../../commonType/employee";

export interface getMonthScheduleProps {
  date: string;
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

export interface setScheduleListTypes {
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface getWeekScheduleProps {
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
}

export interface getDetailScheduleProps {
  id: number;
  setScheduleDetail: React.Dispatch<
    React.SetStateAction<scheduleObjProps | undefined>
  >;

  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
}

export interface getEmployeeScheduleProps
  extends paginationType.paginationProps {
  employeeId: string;
  setScheduleToShow: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
  page?: number;
}

export interface getTotalScheduleProps extends paginationType.paginationProps {
  setScheduleToShow?: (
    value: React.SetStateAction<scheduleObjProps[] | undefined>
  ) => void;

  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface createScheduleProps
  extends setScheduleListTypes,
    paginationType.paginationProps {
  employeeId: string;
  hoursId: string;
  date: string;
  startTime: string;
  endTime: string;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
  setScheduleToShow: (
    value: React.SetStateAction<scheduleObjProps[] | undefined>
  ) => void;
}

export interface updateScheduleProps
  extends setScheduleListTypes,
    paginationType.paginationProps {
  id: number;
  employeeId: string;
  hoursId: string;
  date: string;
  startTime: string;
  endTime: string;

  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
  setScheduleToShow: (
    value: React.SetStateAction<scheduleObjProps[] | undefined>
  ) => void;
}

export interface deleteScheduleProps
  extends setScheduleListTypes,
    paginationType.paginationProps {
  id: number;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  setScheduleToShow: (
    value: React.SetStateAction<scheduleObjProps[] | undefined>
  ) => void;
}

export interface integratedScheduleRenderProps {
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
  setTotalElement: (totalElementState: number) => {
    type: "handleTotalElement/SET_TOTAL_ELEMENTS";
    payload: number;
  };
  setTotalPage: (totalPageState: number) => {
    type: "handleTotalPages/SET_TOTAL_PAGES";
    payload: number;
  };
  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;
}
