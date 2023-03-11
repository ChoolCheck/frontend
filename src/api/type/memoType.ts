export interface createMemoProps {
  date: string;
  content: string;
  setWriteModal: (readModalState: boolean) => {
    type: "handleWriteodal/SETWRITEMODAL";
    payload: boolean;
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
