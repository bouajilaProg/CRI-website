
import CryptoJS from 'crypto-js';

const SECRET_KEY = "40d576545e35078a2524"

export function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, SECRET_KEY as string).toString();
}

export function decrypt(value: string): string {
  return CryptoJS.AES.decrypt(value, SECRET_KEY as string).toString(CryptoJS.enc.Utf8);
}

function getUserId(): string {
  console.log("user_id " + localStorage.getItem("user_id"));
  return (localStorage.getItem("user_id") as string);
}

export default getUserId;
