import { printLog, printError, printWarning, clearLog } from "../actions/log";
import { handleActions, combineActions } from "redux-actions";
import * as enums from "../constants";

const initialState = [
  {
    timestamp: new Date().toLocaleString(),
    log: "Welcome",
    type: enums.LOG_TYPES.LOG
  }
];

export default handleActions(
  {
    [combineActions(printLog, printError, printWarning)]: (
      state,
      { payload: { log, type } }
    ) => state.concat({ timestamp: new Date().toLocaleString(), log, type }),
    [clearLog]: () => []
  },
  initialState
);
