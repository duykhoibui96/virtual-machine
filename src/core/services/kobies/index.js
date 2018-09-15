import EventEmitter from 'events'
import Koby from './koby'

export default class Kobies extends EventEmitter {
    constructor(settings) {
        super()
        this._settings = settings
        this._kobies = {}
    }

    plugDevice(deviceInfo) {
        const koby = new Koby(deviceInfo)
        koby.on('activating', this.emit('activating', deviceInfo.udid))
            .on('activated', this.emit('activated', deviceInfo.udid))
            .on('deactivating', this.emit('deactivating', deviceInfo.udid))
            .on('deactivated', this.emit('deactivated', deviceInfo.udid))
        koby.activate()
        this._kobies[deviceInfo.udid] = koby
    }

    unplugDevice(deviceUDID) {
        const koby = this._kobies[deviceUDID]
        if (koby) koby.deactivate()
    }

}