import { loadDevices, loadDevicesFailed, addDevice, removeDevice, setDevices } from "../../main/actions";
import * as enums from "../constants";
import { handleActions } from "redux-actions";

const initialState = {
  devices: [],
  state: enums.DATA_STATES.LOADED
};

export default handleActions(
  new Map([
    [
      loadDevices,
      (state) => ({ ...state, state: enums.DATA_STATES.LOADING })
    ],
    [
      loadDevicesFailed,
      (state) => ({ ...state, state: enums.DATA_STATES.ERROR })
    ],
    [
      setDevices,
      (state, { payload: devices }) => ({ state: enums.DATA_STATES.LOADED, devices })
    ],
    [
      addDevice,
      (state, { payload: device }) => ({ ...state, devices: state.devices.concat(device) })
    ],
    [
      removeDevice,
      (state, { payload: deviceUdid }) => {
        const deviceList = state.devices.slice();
        const removedDeviceIndex = deviceList.findIndex(
          device => device.udid === deviceUdid
        );
        if (removedDeviceIndex >= 0) {
          deviceList.splice(removedDeviceIndex, 1);
          state = {
            ...state,
            devices: deviceList
          };
        }
        return state
      }
    ]
  ]),
  initialState
)
