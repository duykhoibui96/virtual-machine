import { setDevices, updateStatus } from "../actions/device";
import { handleActions, combineActions } from "redux-actions";
import * as enums from "../constants"

const initialState = [
  {
    platformName: enums.PLATFORM.IOS,
    platformVersion: "4.4.1",
    deviceName: "IPhone X 64GB",
    udid: "ioqwejhjkahdflewfoahsdf",
    state: enums.DEVICE_STATES.DEACTIVATED
  },
  {
    platformName: enums.PLATFORM.ANDROID,
    platformVersion: "3.2.1",
    deviceName: "Galaxy J7 PRO",
    udid: "752a6sdf26a6ef26asdf",
    state: enums.DEVICE_STATES.DEACTIVATED
  },
  {
    platformName: enums.PLATFORM.IOS,
    platformVersion: "5.1",
    deviceName: "IPhone X Plus 64GB",
    udid: "365wefqafasdfasdfasdf",
    state: enums.DEVICE_STATES.DEACTIVATED
  }
];

export default handleActions(
  {
    [setDevices]: (state, { payload: { devices } }) => ({ devices }),
    [updateStatus]: (state, {payload: { udid, state: deviceState }}) => {
      const deviceIndex = state.findIndex(d => d.udid === udid)
      if (deviceIndex >= 0) {
        const newDeviceList = state.slice()
        newDeviceList[deviceIndex].state = deviceState
        return newDeviceList
      }
      return state
    }
  },
  initialState
);
