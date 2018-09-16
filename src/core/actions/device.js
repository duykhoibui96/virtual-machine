import { createAction } from "redux-actions";
import keyMirror from "keymirror";

export const actionKeys = keyMirror({
  LOAD_DEVICES: null,
  SET_DEVICES: null,
  UPDATE_DEVICE_STATUS: null
});

export const loadDevices = createAction(actionKeys.LOAD_DEVICES);
export const setDevices = createAction(actionKeys.SET_DEVICES, devices => ({
  devices
}));
export const updateStatus = createAction(
  actionKeys.UPDATE_DEVICE_STATUS,
  (udid, state) => ({
    udid,
    state
  })
);
