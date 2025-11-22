import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDNwlbQYfFXbgrM2BUHCemcJ4tH9UEMUTs",
  authDomain: "cis371-dbf3f.firebaseapp.com",
  projectId: "cis371-dbf3f",
  storageBucket: "cis371-dbf3f.firebasestorage.app",
  messagingSenderId: "81878016164",
  appId: "1:81878016164:web:d6183d1bbe6e0f31fd8631",
  measurementId: "G-MDW7JQ8N92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
