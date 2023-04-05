import * as reducerType from "../../Redux/Types";
import * as paginationType from "../../commonType/pagination";
import * as employeeType from "../../commonType/employee";

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
export interface getDateWorkcheckProps extends paginationType.paginationProps {
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

  startInput?: string;
  endInput?: string;
}

export interface getEmployeeWorkcheckProps
  extends paginationType.paginationProps {
  employeeId: string;
  startInput?: string;
  endInput?: string;
  page?: number;
  setWorkcheckToShow: React.Dispatch<
    React.SetStateAction<workcheckObjProps[] | undefined>
  >;
}

export interface integratedWorkcheckRenderProps
  extends paginationType.paginationProps {
  setTotalWorkCheckList: (
    totalWorkcheckList: workcheckObjProps[] | undefined
  ) => {
    type: "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST";
    payload: reducerType.workcheckObjProps[] | undefined;
  };

  setEmployeeList: React.Dispatch<
    React.SetStateAction<employeeType.employeeProps[] | undefined>
  >;
}
