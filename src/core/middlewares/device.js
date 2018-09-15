import { call, put, takeEvery } from "redux-saga/effects";
import { actionKeys, setDevices } from "../actions/device";
import { printLog, printError } from "../actions/log";
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

function* updateDeviceStatus(action) {
  const { payload } = action
  yield put(
    printLog(
      `${action.type === actionKeys.PLUG_DEVICE ? "Plug" : "Unplug"} device ${
        payload.udid
      }`
    )
  );
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* loadDevices() {
  yield takeEvery(actionKeys.LOAD_DEVICES, fetchDevice);
  yield takeEvery(actionKeys.PLUG_DEVICE, updateDeviceStatus);
  yield takeEvery(actionKeys.UNPLUG_DEVICE, updateDeviceStatus);
}

export default loadDevices;
