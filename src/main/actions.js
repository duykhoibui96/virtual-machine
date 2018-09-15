import keyMirror from "keymirror";
import { createAction } from "redux-actions";

const actionKeys = keyMirror({
  LOADING_DEVICES: null,
  FAIL_TO_LOAD_DEVICES: null,
  SET_DEVICES: null,
  ADD_DEVICE: null,
  REMOVE_DEVICE: null,
  PLUG_DEVICE: null,
  UNPLUG_DEVICE: null,
  ACTIVATE_DEVICE: null,
  DEACTIVATE_DEVICE: null,
  RUN_DEVICE: null,
  STOP_DEVICE: null
});

export default actionKeys

export const loadDevices = createAction(actionKeys.LOADING_DEVICES)
export const loadDevicesFailed = createAction(actionKeys.FAIL_TO_LOAD_DEVICES)
export const setDevices = createAction(actionKeys.SET_DEVICES, devices => devices)
export const addDevice = createAction(actionKeys.ADD_DEVICE, device => device)
export const removeDevice = createAction(actionKeys.REMOVE_DEVICE, udid => udid)


