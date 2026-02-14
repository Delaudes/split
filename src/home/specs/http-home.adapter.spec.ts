import { FakeHttpWrapper } from "../../http/fake-http.wrapper";
import { HttpHomeAdapter } from "../adapters/http-home.adapter";

describe('http home adapter', () => {
    let httpHomeAdapter: HttpHomeAdapter;
    let fakeHttpWrapper: FakeHttpWrapper;

    beforeEach(() => {
        fakeHttpWrapper = new FakeHttpWrapper();
        httpHomeAdapter = new HttpHomeAdapter(fakeHttpWrapper);
    });

    it('should create room with correct url and body', async () => {
        const roomName = 'fake-room-name';
        const expectedRoomId = 'fake-room-id';
        fakeHttpWrapper.postResponse = { id: expectedRoomId };

        const roomId = await httpHomeAdapter.createRoom(roomName);

        expect(fakeHttpWrapper.lastPostUrl).toBe("https://split-api-ws8o.onrender.com/rooms");
        expect(fakeHttpWrapper.lastPostBody).toEqual({ name: roomName });
        expect(roomId).toBe(expectedRoomId);
    });
})