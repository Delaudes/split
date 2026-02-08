import { StoragePort } from "./storage.port";

export class FakeStorageWrapper implements StoragePort {
    storage = new Map<string, any>();

    get<T>(key: string): T | null {
        return this.storage.get(key) ?? null;
    }

    set<T>(key: string, value: T): void {
        this.storage.set(key, value);
    }
}
