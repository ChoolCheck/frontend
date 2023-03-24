import { NavigateFunction } from "react-router-dom";

export interface apiLoginProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface emailProps {
  setEmailCertificated: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

export interface apiSignupProps {
  email: string;
  password: string;
  storeName: string;
  navigate: NavigateFunction;
}

export interface apiLogoutProps {
  navigate: NavigateFunction;
}
