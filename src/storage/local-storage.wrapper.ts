import { StoragePort } from "./storage.port";

export class LocalStorageWrapper implements StoragePort {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (item === null) {
            return null;
        }
        try {
            return JSON.parse(item) as T;
        } catch {
            return item as T;
        }
    }

    set<T>(key: string, value: T): void {
        const serialized = typeof value === 'string'
            ? value
            : JSON.stringify(value);
        localStorage.setItem(key, serialized);
    }
}
