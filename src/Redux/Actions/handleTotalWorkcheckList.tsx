import * as type from "../Types";

export const SETTOTALWORKCHECKLIST =
  "handleTotalWorkcheckList/SETTOTALWORKCHECKLIST" as const;

export const setTotalWorkcheckList = (
  totalWorkcheckList: type.workcheckObjProps[] | undefined
) => ({
  type: SETTOTALWORKCHECKLIST,
  payload: totalWorkcheckList,
});
