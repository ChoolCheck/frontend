export interface paginationProps {
  setTotalElement: (totalElementState: number) => {
    type: "handleTotalElement/SET_TOTAL_ELEMENTS";
    payload: number;
  };
  setTotalPage: (totalPageState: number) => {
    type: "handleTotalPages/SET_TOTAL_PAGES";
    payload: number;
  };
  page?: number;
}
