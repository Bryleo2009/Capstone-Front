import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  private key = 'ofsystem';


  encrypt(value: string): string {
    const encrypted = CryptoJS.AES.encrypt(value, this.key);
    return encrypted.toString();
  }

  decrypt(value: string): string {
    const decrypted = CryptoJS.AES.decrypt(value, this.key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
