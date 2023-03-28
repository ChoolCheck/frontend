export const SET_TOTAL_PAGES = "handleTotalPages/SET_TOTAL_PAGES" as const;

export const setTotalPages = (totalPages: number) => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages,
});
