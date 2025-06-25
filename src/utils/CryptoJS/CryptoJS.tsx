import CryptoJS from "crypto-js";

const SECRET_KEY: string = process.env.SECRET_KEY || "default-key";

export function hashPassword(password: string): string {

  return CryptoJS.MD5(password).toString();
}

export function encrypt(text: string, key: string = SECRET_KEY): string {
  return CryptoJS.AES.encrypt(text, key).toString();
}

export function decrypt(ciphertext: string, key: string = SECRET_KEY): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
