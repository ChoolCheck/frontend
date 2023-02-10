export interface createWorktypeProps {
  title: string;
  startTime: string;
  endTime: string;
}

export interface getWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<createWorktypeProps[] | undefined>
  >;
}
