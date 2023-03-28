export const SETPAGINATION = "handlePaginationFocus/SETPAGINATION" as const;

export const setPaginationFocus = (paginationFocus: string) => ({
  type: SETPAGINATION,
  payload: paginationFocus,
});
