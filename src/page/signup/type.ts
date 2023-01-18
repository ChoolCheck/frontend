export interface signupProps {
  email: string;
  password: string;
  storeName: string;
  onCancleSignup: React.MouseEventHandler<HTMLButtonElement>;
  onChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  onSubmitForm: React.MouseEventHandler<HTMLButtonElement>;
}
