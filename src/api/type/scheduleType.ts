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

export interface getEmployeeScheduleProps {
  employeeId: string;
  setScheduleToShow: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface getTotalScheduleProps {
  setScheduleToShow?: (
    value: React.SetStateAction<scheduleObjProps[] | undefined>
  ) => void;

  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}
export interface createScheduleProps extends setScheduleListTypes {
  employeeId: string;
  hours_id: string;
  date: string;
  startTime: string;
  endTime: string;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}

export interface updateScheduleProps extends setScheduleListTypes {
  id: number;
  employeeId: string;
  hours_id: string;
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

export interface deleteScheduleProps extends setScheduleListTypes {
  id: number;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  setScheduleToShow: (
    value: React.SetStateAction<scheduleObjProps[] | undefined>
  ) => void;
}
