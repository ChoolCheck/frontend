import * as reducerType from "../../Redux/Types";

// setReadModal: (readModalState: boolean) => {
//   type: "handleReadModal/SETREADMODAL";
//   payload: boolean;
// };
// setWriteModal: (readModalState: boolean) => {
//   type: "handleWriteodal/SETWRITEMODAL";
//   payload: boolean;
// };
export interface workcheckObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}

export interface createWorkcheckProps {
  employeeId: string;
  hours_id: string;
  date: string;
  startTime: string;
  endTime: string;

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };
}

export interface updateWorkcheckProps {
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
  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };
}

export interface deleteWorkcheckProps {
  id: number;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };
  setWorkcheckToShow: (
    value: React.SetStateAction<workcheckObjProps[] | undefined>
  ) => void;
  totalWorkcheckList: workcheckObjProps[] | undefined;
}

export interface getMonthWorkcheckProps {
  date: string;
  setWorkcheckToShow: React.Dispatch<
    React.SetStateAction<workcheckObjProps[] | undefined>
  >;
}
export interface getDateWorkcheckProps {
  startInput: string;
  endInput: string;
  setWorkcheckToShow: React.Dispatch<
    React.SetStateAction<workcheckObjProps[] | undefined>
  >;
}

export interface getDetailWorkcheckProps {
  id: number;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
  setWorkcheckDetail: React.Dispatch<
    React.SetStateAction<workcheckObjProps | undefined>
  >;
}

export interface getTotalWorkcheckProps {
  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };
}

export interface getEmployeeWorkcheckProps {
  employee_id: string;
  setWorkcheckToShow: React.Dispatch<
    React.SetStateAction<workcheckObjProps[] | undefined>
  >;
}
