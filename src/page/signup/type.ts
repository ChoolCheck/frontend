export interface signupProps {
  emailMessage: string;
  passwordMessage: string;
  passwordCheckMessage: string;
  storeNameMessage: string;

  isEmail: boolean;
  isPassword: boolean;
  isStoreName: boolean;
  isPasswordCheck: boolean;

  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  onChangeStoreName: React.ChangeEventHandler<HTMLInputElement>;
  onChangePasswordCheck: React.ChangeEventHandler<HTMLInputElement>;
  onCancleSignup: React.MouseEventHandler<HTMLButtonElement>;
  onSubmitForm: React.MouseEventHandler<HTMLButtonElement>;
}
