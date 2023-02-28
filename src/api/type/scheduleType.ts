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
  employee_id: string;
  setScheduleToShow: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface getTotalScheduleProps {
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}
export interface createScheduleProps {
  employeeId: string;
  hours_id: string;
  date: string;
  startTime: string;
  endTime: string;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };

  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
}

export interface updateScheduleProps {
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
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface deleteScheduleProps {
  id: number;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  setWeekScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[][] | undefined>
  >;
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}
