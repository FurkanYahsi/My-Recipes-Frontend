import CryptoJS from "crypto-js";



export function hashPassword(password: string): string {

  return CryptoJS.MD5(password).toString();
}

export function encrypt(text: string, key: string = process.env.SECRET_KEY || "default-key"): string {
  return CryptoJS.AES.encrypt(text, key).toString();
}

export function decrypt(ciphertext: string, key: string = process.env.SECRET_KEY || "default-key"): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
