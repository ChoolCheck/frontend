import * as navType from "../../commonType/navigate";

export interface apiLoginProps extends navType.navigateProps {
  email: string;
  password: string;
}

export interface emailProps {
  setEmailCertificated: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

export interface apiSignupProps extends navType.navigateProps {
  email: string;
  password: string;
  storeName: string;
  code: string;
}
