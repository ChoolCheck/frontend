import { Dispatch } from "react";
import {} from "react-router-dom";

export interface createWorktypeProps {
  worktypeForm: {
    title: string;
    startTime: string;
    endTime: string;
  };

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}

export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
}
export interface getWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}

export interface createEmployeeProps {
  employeeForm: {
    name: string;
    role: string;
    color: string;
  };

  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
}
