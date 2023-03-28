import * as reducerType from "../../Redux/Types";
import * as paginationType from "../../commonType/pagination";

export interface workcheckObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}

export interface createWorkcheckProps extends paginationType.paginationProps {
  employeeId: string;
  hoursId: string;
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

export interface updateWorkcheckProps extends paginationType.paginationProps {
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
  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };
  setWorkcheckToShow: (
    value: React.SetStateAction<workcheckObjProps[] | undefined>
  ) => void;
}

export interface deleteWorkcheckProps extends paginationType.paginationProps {
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

export interface getTotalWorkcheckProps extends paginationType.paginationProps {
  setWorkcheckToShow?: (
    value: React.SetStateAction<workcheckObjProps[] | undefined>
  ) => void;

  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };
}

export interface getEmployeeWorkcheckProps {
  employeeId: string;
  startInput?: string;
  endInput?: string;
  setWorkcheckToShow: React.Dispatch<
    React.SetStateAction<workcheckObjProps[] | undefined>
  >;
}
