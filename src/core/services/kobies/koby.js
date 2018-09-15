import EventEmitter from 'events'
import api from "../../api"
import TcpConnection from "../connection/tcp"
import * as enums from '@kobiton/core-util/enum'
import { TOKEN } from "../../config";
import { debug, retry } from '@kobiton/core-util'

export default class Koby extends EventEmitter {
    constructor(deviceInfo) {
        super()
        this._deviceInfo = deviceInfo
        this._authInfo = { token: TOKEN, udid: deviceInfo.udid }
        this._ns = `koby-${deviceInfo.udid}-${Date.now()}`
    }

    async activate() {
        await this._updateStatus(enums.DEVICE_STATES.ACTIVATING)
        this.emit('activating')
        const getHub = () => {
            debug.log('activate getHub....')
            return api.send('hubs/which', 'GET')
        }
        this._hub = await retry(getHub, -1, 5000)
        await this._establishControlConnection()
        await this._updateStatus(enums.DEVICE_STATES.ACTIVATED)
        this.emit('activated')
    }

    async deactivate() {
        this._updateStatus(DeviceStates.DEACTIVATING)
        this.emit('deactivating')
        await this._turnDeviceOffline()
        this._updateStatus(DeviceStates.DEACTIVATED)
        this.emit('deactivated')
    }

    _updateStatus(status) {
        return api.send(`devices/${this._deviceInfo.udid}/status`, 'PUT', {
            deviceUDID: this._deviceInfo.udid,
            state: status,
            message: this._deviceInfo.message
        })
    }

    _establishControlConnection() {
        const connectionInfo = { runningSession: !!this._session, ...this._authInfo }

        await this._disconnectControlConnection()
        this._controlConnection = new TcpConnection(
            enums.CONNECTION_TYPES.CONTROL, this._hub, connectionInfo)
        this._controlConnection
            .on('error', ({ message }) => {
                debug.error(this._ns, `Control connection error: ${message}`)
                if (message === 'not-authorized') {
                    this.emit('not-authorized')
                }
            })
            .on('message', :: this._handleMessage)
        await this._controlConnection.establish()
    }

    _disconnectControlConnection() {
        if (this._controlConnection) {
            await this._controlConnection
                .removeAllListeners()
                .drop()
            this._controlConnection = null
        }
    }

    _handleHubMessage(message) {

    }

    _startSession() {

    }

    _endSession() {

    }

    _turnDeviceOffline() {


    }
}