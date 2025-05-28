import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StorageWrapper {
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = storage["create"]();
  }

  async get(key: string): Promise<any> {
    await this.storageReady;
    return this.storage["get"](key);
  }

  
}