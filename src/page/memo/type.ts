import * as employeeType from "../../commonType/employee";
import * as worktypeType from "../../commonType/worktype";

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
