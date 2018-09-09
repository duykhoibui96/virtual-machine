import actions from "../actions";
import uuid from "uuid/v1";
import api from "../api";

export function addDevice(device) {
  const newDevice = {
    ...device,
    udid: uuid()
  };
  return {
    type: actions.ADD_DEVICE,
    device: newDevice
  };
}

export function removeDevice(deviceUdid) {
  return {
    type: actions.REMOVE_DEVICE,
    deviceUdid
  };
}

export async function loadDevices(dispatch) {
  const devices = await api.send("/devices");
  dispatch({
    type: actions.LOAD_DEVICE,
    devices
  });
}
