import BPromise from 'bluebird'

export function delay(ms) {
    return new BPromise((resolve) => setTimeout(() => resolve(), ms))
}