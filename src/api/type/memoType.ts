export interface createMemoProps {
  date: string;
  content: string;
}
export interface updateMemoProps {
  id: number;
  date: string;
  content: string;
}
export interface deleteMemoProps {
  id: number;
}
export interface getDetailMemoProps {
  id: number;
}
export interface getDateMemoProps {
  date: string;
}
