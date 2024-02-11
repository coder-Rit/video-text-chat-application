// encryptionUtils.js

import CryptoJS from 'crypto-js';

const key = process.env.REACT_APP_MSG_SECREATE as string

// Function to encrypt a message using AES encryption
export const encryptMessage = (message :string) => {
    const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    return encryptedMessage;
};

// Function to decrypt a message using AES decryption
export const decryptMessage = (encryptedMessage:string) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
};

export default {
    encryptMessage,
    decryptMessage
}