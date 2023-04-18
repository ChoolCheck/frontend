import * as type from "../Types";

export const SETMEMOLIST = "handleMemoFlagList/SETMEMOLIST" as const;

export const setMemoFlagList = (
  memoList: type.memoFlagListProps[] | undefined
) => ({
  type: SETMEMOLIST,
  payload: memoList,
});
