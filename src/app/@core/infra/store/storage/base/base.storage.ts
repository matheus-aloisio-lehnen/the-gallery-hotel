export class BaseStorage {

    protected storage: Storage;

    constructor(
        storageType: 'session' | 'local' = 'local',
    ) {
        this.storage = storageType === 'session'
            ? window.sessionStorage
            : window.localStorage;
    }

    set(key: string, value: any) {
        if (!this.storage) return;
        this.storage.setItem(key, value);
    }

    get(key: string) {
        if (!this.storage) return;
        const value = this.storage.getItem(key);
        if(!value) return '';
        return JSON.parse(value);
    }

    remove(key: string) {
        if (!this.storage) return false;
        this.storage.removeItem(key);
        return true;
    }

    clear() {
        if (!this.storage) return;
        this.storage.clear();
        return true;
    }

}
