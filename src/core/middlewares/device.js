import { call, put, takeEvery, delay } from "redux-saga/effects";
import { actionKeys, updateStatus } from "../actions/device";
import { printLog, printError } from "../actions/log";
import * as enums from "../constants";
import api from "../api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchDevice(action) {
  try {
    yield put(printLog("Start fetching devices from server ..."));
    const { privateDevices } = yield call(api.send, "/devices", "GET");
  } catch (e) {
    yield put(printError(e.message));
    yield put(printError("Unable to fetch devices"));
  }
}

function* informStatusToServer() {
  yield new Promise(resolve => setTimeout(() => resolve(), 5000));
}

function* updateDeviceStatus(action) {
  const { payload } = action;
  let notify, nextAction;
  switch (payload.state) {
    case enums.DEVICE_STATES.DEACTIVATED:
      notify = "Deactivated device ";
      break;
    case enums.DEVICE_STATES.DEACTIVATING:
      notify = "Deactivating device ";
      nextAction = put(
        updateStatus(payload.udid, enums.DEVICE_STATES.DEACTIVATED)
      );
      break;
    case enums.DEVICE_STATES.ACTIVATING:
      notify = "Activating device ";
      nextAction = put(
        updateStatus(payload.udid, enums.DEVICE_STATES.ACTIVATED)
      );
      break;
    case enums.DEVICE_STATES.ACTIVATED:
      notify = "Activated device ";
      break;
    default:
      notify = "Unknown command on device ";
  }

  yield put(printLog(notify + payload.udid));
  if (nextAction) {
    yield call(informStatusToServer);
    yield nextAction;
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* loadDevices() {
  yield takeEvery(actionKeys.LOAD_DEVICES, fetchDevice);
  yield takeEvery(actionKeys.UPDATE_DEVICE_STATUS, updateDeviceStatus);
}

export default loadDevices;
