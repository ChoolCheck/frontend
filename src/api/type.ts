import { NavigateFunction } from "react-router-dom";

export interface apiLoginProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface apiSignupProps {
  email: string;
  password: string;
  storeName: string;
  navigate: NavigateFunction;
}
