import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdzmJcTCWXnmfW9f3npptdAIMCPopiOb8",
  authDomain: "katalog-produk-35cea.firebaseapp.com",
  databaseURL: "https://katalog-produk-35cea-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "katalog-produk-35cea",
  storageBucket: "katalog-produk-35cea.firebasestorage.app",
  messagingSenderId: "994758992068",
  appId: "1:994758992068:web:e1f6b8cf530c5668df2991",
  measurementId: "G-83PYTSG8ZM"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);