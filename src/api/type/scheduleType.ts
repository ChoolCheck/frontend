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
}

export interface getMonthScheduleProps {
  date: string;
}
export interface getWeekScheduleProps {}

export interface getDetailScheduleProps {
  id: number;
}

export interface getEmployeeScheduleProps {
  employee_id: string;
}

export interface getTotalScheduleProps {}

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
