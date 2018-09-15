import { call, put, takeLatest } from 'redux-saga/effects'
import actions, { setDevices, loadDevicesFailed } from '../../main/actions'
import api from '../api'
import { delay } from "../utils";

function* fetchDevices() {
    try {
        const { privateDevices: devices } = yield call(api.send.bind(api), '/v1/devices', 'GET')
        yield call(delay, 3000)
        yield put(setDevices(devices))
    } catch (error) {
        console.log(error)
        yield put(loadDevicesFailed())
    }
}

function* middleware() {
    yield takeLatest(actions.LOADING_DEVICES, fetchDevices)
}

export default middleware