// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6lrTXWbReBi38b7s266JDj_paBtubL4w",
  authDomain: "chat-app-file-store.firebaseapp.com",
  projectId: "chat-app-file-store",
  storageBucket: "chat-app-file-store.appspot.com",
  messagingSenderId: "328295529642",
  appId: "1:328295529642:web:050341ed58bd663224a4d3",
  measurementId: "G-RWG8M9YFKE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);