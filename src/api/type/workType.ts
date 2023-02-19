export interface createWorkcheckProps {
  id: string;
  employee_id: string;
  hours_id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface updateWorkcheckProps {
  id: string;
  employee_id: string;
  hours_id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface deleteWorkcheckProps {
  id: number;
}

export interface getMonthWorkcheckProps {
  date: string;
}

export interface getDetailWorkcheckProps {
  id: number;
}

export interface getTotalWorkcheckProps {}

export interface getEmployeeWorkcheckProps {
  employee_id: string;
}
