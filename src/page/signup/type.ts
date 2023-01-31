export interface signupProps {
  email: string;
  password: string;
  storeName: string;
  storeNameMessage: string;

  emailMessage: string;
  passwordMessage: string;
  passwordCheckMessage: string;

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
