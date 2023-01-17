import { createMemo } from 'solid-js'
import { mdnsState } from './mdns'

export const connectedUserName = createMemo(() => mdnsState().connectedUser)