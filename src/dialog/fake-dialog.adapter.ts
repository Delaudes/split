export class FakeDialogAdapter {
    isClose = false;
    close(): void {
        this.isClose = true;
    }
}