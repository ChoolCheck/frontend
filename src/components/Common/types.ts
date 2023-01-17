import React from "react";
import { IChildrenProps } from "../../types/children";
// import { THistory } from "../../types/navigate";

export interface IModalProps extends IChildrenProps {
  open: boolean;
  onClose: () => void;
  headerTitle: string;
  footer: React.ReactElement;
}
