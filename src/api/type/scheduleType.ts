export interface createScheduleProps {
  employee: string;
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
}

export interface getEmployeeScheduleProps {
  employee_id: string;
}

export interface getTotalScheduleProps {
  setTotalScheduleList: React.Dispatch<
    React.SetStateAction<scheduleObjProps[] | undefined>
  >;
}

export interface updateScheduleProps {
  id: string;
  employee_id: string;
  hours_id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface deleteScheduleProps {
  id: number;
}
