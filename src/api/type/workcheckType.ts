import * as reducerType from "../../Redux/Types";
export interface paginationProps {
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setTotalElements: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}
export interface workcheckObjProps {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: string | null;
  color: string;
  id: number;
}

export interface createWorkcheckProps extends paginationProps {
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

export interface updateWorkcheckProps extends paginationProps {
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

export interface deleteWorkcheckProps extends paginationProps {
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

export interface getTotalWorkcheckProps extends paginationProps {
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
  setWorkcheckToShow: React.Dispatch<
    React.SetStateAction<workcheckObjProps[] | undefined>
  >;
}
