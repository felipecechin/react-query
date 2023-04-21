import CryptoJS from "crypto-js";

export const encryptData = (data) => {
  console.log('criptografando...', data);
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    '213131'
  ).toString();

  return encryptedData;
};

export const decryptData = (data) => {
  console.log('descriptografando...', data);
  const bytes = CryptoJS.AES.decrypt(data, '213131');
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};