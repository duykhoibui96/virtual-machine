import keyMirror from "keymirror";

export const DEVICE_STATES = keyMirror({
  DEACTIVATED: null,
  DEACTIVATING: null,
  ACTIVATED: null,
  ACTIVATING: null
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
});

export const CONNECTION_TYPES = keyMirror({
  CONTROL: null,
  SESSION: null
})
