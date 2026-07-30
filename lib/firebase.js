import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ_LIMgZyHgru1Fle-UpoFVkeAVcYm_sk",
  authDomain: "voyagees.com",
  projectId: "voyajees",
  storageBucket: "voyajees.firebasestorage.app",
  messagingSenderId: "990797950207",
  appId: "1:990797950207:web:f6303d84c0ae78d532b0ca"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);