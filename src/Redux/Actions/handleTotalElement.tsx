export const SET_TOTAL_ELEMENTS =
  "handleTotalElement/SET_TOTAL_ELEMENTS" as const;

export const setTotalElements = (totalElement: number) => ({
  type: SET_TOTAL_ELEMENTS,
  payload: totalElement,
});
