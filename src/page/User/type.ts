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
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordMessage: string;
  onChangePasswordCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordCheck: boolean;
  passwordCheckMessage: string;
  onUpdateClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
