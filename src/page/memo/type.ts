export interface createMemoViewProps {
  memoForm: {
    content: string;
    date: string;
  };
  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;
  onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement>;

  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  onClickCreate: React.MouseEventHandler<HTMLButtonElement>;
}
export interface updateMemoViewProps {
  date: string;
  content: string;
  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;
  onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement>;

  onClickCancelOnModal: React.MouseEventHandler<HTMLButtonElement>;
  onClickCreate: React.MouseEventHandler<HTMLButtonElement>;
}

export interface updateMemoProps {
  memoForm: memoProps | undefined;
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

export interface memoProps {
  id: number;
  date: string;
  content: string;
}

export interface memoDetailProps {
  memoDetail: memoProps | undefined;
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

export interface memoDetailViewProps {
  memoDetail: memoProps | undefined;
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}
