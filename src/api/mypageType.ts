import { NavigateFunction } from "react-router-dom";

export interface userInfoProps {
  email: string;
  storeName: string;
  createdDate: string;
}

export interface setUserInfoProps {
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoProps>>;
}

export interface updateUserInfoProps {
  storeName: string;
  navigate: NavigateFunction;
}

export interface updatePasswordProps {
  password: string;
  mailToken: string;
  navigate: NavigateFunction;
}

export interface sendEmailProps {
  navigate: NavigateFunction;
}
