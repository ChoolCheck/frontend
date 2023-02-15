export interface userInfoProps {
  email: string;
  storeName: string;
  createdDate: string;
}

export interface mypageViewProps {
  userInfo: userInfoProps;
}
export interface updateUserProps {
  userInfo: userInfoProps;
}

export interface updatePasswordProps {
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  isPassword: boolean;
  passwordMessage: string;
  onChangePasswordCheck: React.ChangeEventHandler<HTMLInputElement>;
  isPasswordCheck: boolean;
  passwordCheckMessage: string;
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface updateUserProps {
  userInfo: userInfoProps;
  storeName: string;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
}
