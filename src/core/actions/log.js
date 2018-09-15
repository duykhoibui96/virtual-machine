import { createAction } from "redux-actions";
import keyMirror from "keymirror";
import * as enums from "../constants";

export const actionKeys = keyMirror({
  WRITE_LOG: null,
  CLEAR_LOG: null
});

export const clearLog = createAction(actionKeys.CLEAR_LOG);
export const printLog = createAction(actionKeys.WRITE_LOG, log => ({
  log,
  type: enums.LOG_TYPES.LOG
}));
export const printError = createAction(actionKeys.WRITE_LOG, log => ({
  log,
  type: enums.LOG_TYPES.ERROR
}));
export const printWarning = createAction(actionKeys.WRITE_LOG, log => ({
  log,
  type: enums.LOG_TYPES.WARNING
}));
