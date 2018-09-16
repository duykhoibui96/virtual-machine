import keyMirror from "keymirror";

export const DEVICE_STATES = keyMirror({
  UNPLUGGED: null,
  UNPLUGGING: null,
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
