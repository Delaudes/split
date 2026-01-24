export interface HomePort {
    createRoom(roomName: string): Promise<string>;
}