export interface loginProps {
  email: string;
  password: string;
  onChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  onSubmitForm: React.MouseEventHandler<HTMLButtonElement>;
}
