import * as reducerType from "../../Redux/Types";

export interface createMemoProps {
  date: string;
  content: string;
  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
  setMemoFlaglist: (memoFlagList: reducerType.memoFlagListProps[]) => {
    type: "handleMemoFlagList/SETMEMOLIST";
    payload: reducerType.memoFlagListProps[] | undefined;
  };
}
export interface updateMemoProps {
  id: number;
  date: string;
  content: string;
  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
  };
  setMemoDetail: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          date: string;
          content: string;
        }
      | undefined
    >
  >;
}
export interface deleteMemoProps {
  id: number;
  setReadModal: (readModalState: boolean) => {
    type: "handleReadModal/SETREADMODAL";
    payload: boolean;
  };
}
export interface getDetailMemoProps {
  id: number;
  setMemoDetail: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          date: string;
          content: string;
        }
      | undefined
    >
  >;
}

export interface getMemoFlagProps {
  month: string;

  setMemoFlaglist: (memoFlagList: reducerType.memoFlagListProps[]) => {
    type: "handleMemoFlagList/SETMEMOLIST";
    payload: reducerType.memoFlagListProps[] | undefined;
  };
}

export interface memoProps {
  id: number;
  date: string;
  content: string;
}

export interface getDateMemoProps {
  date: string;
  setMemo: React.Dispatch<React.SetStateAction<memoProps[] | undefined>>;
}
