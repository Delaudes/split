export type HomeViewModel = {
    isCreateRoomLoading: boolean;
    isCreateRoomError: boolean;
    visitedRooms: VisitedRoomViewModel[];
}

export type VisitedRoomViewModel = {
    id: string;
    name: string;
}