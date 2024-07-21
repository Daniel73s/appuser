import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async guardarToken(token: string) {
    this._storage?.set('token', token);
  }

  public async getToken() {
    return this.storage.get('token');
  }

  public async setDataUser(token: string) {
    const data = jwtDecode(token);
    this._storage?.set('user', data);
  }

  public async getDataUser() {
   return this.storage.get('user');
  }

  public deleteToken(){
    return this.storage.remove('token');
  }
  public deleteDataUser(){
    return this.storage.remove('user');
  }
}
