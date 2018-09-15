import { createAction } from "redux-actions";
import keyMirror from "keymirror";
import * as enums from "../constants";

export const actionKeys = keyMirror({
  LOAD_DEVICES: null,
  SET_DEVICES: null,
  PLUG_DEVICE: null,
  UNPLUG_DEVICE: null
});

export const loadDevices = createAction(actionKeys.LOAD_DEVICES);
export const setDevices = createAction(actionKeys.SET_DEVICES, devices => ({
  devices
}));
export const plugDevice = createAction(actionKeys.PLUG_DEVICE, udid => ({
  udid,
  state: enums.DEVICE_STATES.PLUGGED
}));
export const unplugDevice = createAction(actionKeys.UNPLUG_DEVICE, udid => ({
  udid,
  state: enums.DEVICE_STATES.UNPLUGGED
}));
