import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAMcsQyhPequnulxSkEucFuw9x6flzwlsQ",
  authDomain: "ecomerse-a5aa9.firebaseapp.com",
  projectId: "ecomerse-a5aa9",
  storageBucket: "ecomerse-a5aa9.appspot.com",
  messagingSenderId: "266437068734",
  appId: "1:266437068734:web:7ea7c0006ae35f196a1bef",
  measurementId: "G-0H9K51QGHV"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage(firebaseApp);