import { combineReducers } from "redux";
import ReadModalReducer from "./ReadModalReducer";
import WriteModalReducer from "./WriteModalReducer";
import totalWorkcheckListReducer from "./TotalWorkcheckListReducer";

const rootReducer = combineReducers({
  ReadModalReducer,
  WriteModalReducer,
  totalWorkcheckListReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
