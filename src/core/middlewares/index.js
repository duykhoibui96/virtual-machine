import loadDevices from "./device";
import { all } from 'redux-saga/effects'

export default function* loadApp() {
  yield all([loadDevices()]);
}
