import { combineReducers } from "redux";
import ReadModalReducer from "./ReadModalReducer";
import WriteModalReducer from "./WriteModalReducer";
import TotalWorkcheckListReducer from "./TotalWorkcheckListReducer";
import TotalElementReducer from "./TotalElementReducer";
import TotalPageReducer from "./TotalPageReducer";
import CalendarReducer from "./CalendarListReducer";
import MemoFlagReducer from "./MemoFlagListReducer";
import PaginationFocus from "./PaginationFocusReducer";

const rootReducer = combineReducers({
  ReadModalReducer,
  WriteModalReducer,
  TotalWorkcheckListReducer,
  TotalElementReducer,
  TotalPageReducer,
  CalendarReducer,
  MemoFlagReducer,
  PaginationFocus,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
