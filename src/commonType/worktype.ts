export interface worktypeProps {
  title: string;
  startTime: string;
  endTime: string;
  id: number;
}
export interface workTypeList {
  workTypeList: worktypeProps[] | undefined;
}
