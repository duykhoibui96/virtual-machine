import keyMirror from "keymirror";

export const DEVICE_STATES = keyMirror({
  UNPLUGGED: null,
  PLUGGED: null,
  READY: null,
  ACTIVATING: null,
  ACTIVATED: null,
  UTILIZING: null,
  DEACTIVATING: null,
  DEACTIVATED: null,
  ERROR: null
});

export const VIEW = keyMirror({
  DEVICES: null,
  ADD_DEVICE: null
});

export const PLATFORM = {
  IOS: "iOS",
  ANDROID: "Android"
};

export const LOG_TYPES = keyMirror({
  LOG: null,
  ERROR: null,
  WARNING: null
})
