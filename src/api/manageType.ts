export interface createWorktypeProps {
  title: string;
  startTime: string;
  endTime: string;
}

export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
}
export interface getWorktypeProps {
  setWorkTypeList: React.Dispatch<
    React.SetStateAction<worktypeProps[] | undefined>
  >;
}
