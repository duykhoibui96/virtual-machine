import actions from "../actions";
import * as enums from "../constants";

const initialState = {
  devices: [
    {
      platformName: enums.PLATFORM.IOS,
      platformVersion: "4.4.1",
      deviceName: "IPhone X 64GB",
      udid: "ioqwejhjkahdflewfoahsdf",
      statusMessage: "Utilizing",
      state: "UNPLUGGED"
    },
    {
      platformName: enums.PLATFORM.ANDROID,
      platformVersion: "3.2.1",
      deviceName: "Galaxy J7 PRO",
      udid: "752a6sdf26a6ef26asdf",
      statusMessage: "Utilizing",
      state: "UNPLUGGED"
    },
    {
      platformName: enums.PLATFORM.IOS,
      platformVersion: "5.1",
      deviceName: "IPhone X Plus 64GB",
      udid: "365wefqafasdfasdfasdf",
      statusMessage: "Utilizing",
      state: "UNPLUGGED"
    }
  ]
};

export default (
  state = initialState,
  { type, device, deviceUdid, devices }
) => {
  switch (type) {
    case actions.LOAD_DEVICE:
      state = {
        devices
      };
      break;
    case actions.ADD_DEVICE:
      state = {
        devices: state.devices.concat(device)
      };
      break;
    case actions.REMOVE_DEVICE:
      {
        const deviceList = state.devices.slice();
        const removedDeviceIndex = deviceList.findIndex(
          device => device.udid === deviceUdid
        );
        if (removedDeviceIndex >= 0) {
          deviceList.splice(removedDeviceIndex, 1);
          state = {
            devices: deviceList
          };
        }
      }
      break;
    case actions.PLUG_DEVICE:
      break;
    case actions.UNPLUG_DEVICE:
      break;
    case actions.ACTIVATE_DEVICE:
      break;
    case actions.DEACTIVATE_DEVICE:
      break;
    case actions.RUN_DEVICE:
      break;
    case actions.STOP_DEVICE:
      break;
  }
  return state;
};
