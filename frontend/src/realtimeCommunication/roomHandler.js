import * as socketConnection from './socketConnection'

export const createNewRoom = (openRoom) => {
    openRoom()
    socketConnection.createNewRoom()
}