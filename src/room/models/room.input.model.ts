export type RoomInputModel = {
    name: string;
    payers: {
        id: string;
        name: string;
    }[];
}