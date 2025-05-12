import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _storageReady = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}
  /*async init() {
    try {
  
      this._storageReady.next(true);
    } catch (error) {
      console.error('Storage initialization error:', error);
      this._storageReady.next(false);
    }
  }

  get whenReady() {
    return this._storageReady.asObservable();
  }

  async set(key: string, value: any) {
    if (!this._storageReady.value) {
      throw new Error('Storage not ready');
    }
    return this.storage.set(key, value);
  }

  async get(key: string) {
    if (!this._storageReady.value) {
      throw new Error('Storage not ready');
    }
    return this.storage.get(key);
  }*/
