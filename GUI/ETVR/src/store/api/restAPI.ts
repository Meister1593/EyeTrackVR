import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum RESTStatus {
    ACTIVE = 'ACTIVE',
    COMPLETE = 'COMPLETE',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
    NO_CAMERA = 'NO_CAMERA',
}

export enum RESTType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IEndpoint {
    url: string
    type: RESTType
}

export interface IRest {
    status: RESTStatus
    device: string
    response: object
}

export const defaultState: IRest = {
    status: RESTStatus.COMPLETE,
    device: '',
    response: {},
}

/**
 * # Map of endpoints
 * @description
 * Static REST API EndPoints Map
 * @type {Map<string, IEndpoint>}
 * @example
 * const endpoint = endpointsMap.get('ping')
 * endpoint.url // '/ping'
 * endpoint.type // 'GET'
 *
 * These endpoints are built into the REST API server on the ESP32
 *
 * @description
 * **URL Example** - `http://<ip>:81/control/command/<endpoint>`
 */
export const endpointsMap: Map<string, IEndpoint> = new Map<string, IEndpoint>([
    ['ping', { url: '/control/command/ping', type: RESTType.GET }],
    ['save', { url: '/control/command/save', type: RESTType.GET }],
    ['resetConfig', { url: '/control/command/resetConfig', type: RESTType.GET }],
    ['rebootDevice', { url: '/control/command/rebootDevice', type: RESTType.GET }],
    ['restartCamera', { url: '/control/command/restartCamera', type: RESTType.GET }],
    ['getStoredConfig', { url: '/control/command/getStoredConfig', type: RESTType.GET }],
    ['setTxPower', { url: '/control/command/setTxPower', type: RESTType.POST }],
    ['setDevice', { url: '/control/command/setDevice', type: RESTType.POST }],
    ['wifi', { url: '/control/command/wifi', type: RESTType.POST }],
])

const [state, setState] = createStore<IRest>(defaultState)

export const setRestStatus = (status: RESTStatus) => {
    setState(
        produce((s) => {
            s.status = status
        })
    )
}

export const setRestDevice = (device: string) => {
    setState(
        produce((s) => {
            s.device = device
        })
    )
}

export const setRestResponse = (response: object) => {
    setState(
        produce((s) => {
            s.response = response
        })
    )
}

export const restState = createMemo(() => state)