import { combineReducers } from "redux";
import ReadModalReducer from "./ReadModalReducer";
import WriteModalReducer from "./WriteModalReducer";

const rootReducer = combineReducers({ ReadModalReducer, WriteModalReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
