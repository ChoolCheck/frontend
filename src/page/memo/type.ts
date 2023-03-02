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
