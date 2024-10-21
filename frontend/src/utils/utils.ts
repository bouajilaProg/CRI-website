import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';


dotenv.config();
export function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, process.env.SECRET_KEY as string).toString();
}

export function decrypt(value: string): string {
  return CryptoJS.AES.decrypt(value, process.env.SECRET_KEY as string).toString(CryptoJS.enc.Utf8);
}
