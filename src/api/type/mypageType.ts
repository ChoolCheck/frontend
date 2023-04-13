import * as navType from "../../commonType/navigate";

export interface userInfoProps {
  email: string;
  storeName: string;
  createdDate: string;
}

export interface setUserInfoProps {
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoProps>>;
}

export interface updateUserInfoProps extends navType.navigateProps {
  storeName: string;
}

export interface updatePasswordProps extends navType.navigateProps {
  password: string;
  mailToken: string;
}
