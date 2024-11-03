import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh8Z9FqYaFYjCWD3IjDAW7ZJWbWm6TO_w",
  authDomain: "e-commerce-7333a.firebaseapp.com",
  projectId: "e-commerce-7333a",
  storageBucket: "e-commerce-7333a.firebasestorage.app",
  messagingSenderId: "179821641384",
  appId: "1:179821641384:web:f6b9815c3eea61882c4c9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB=getFirestore(app);
const auth=getAuth(app);

export {fireDB,auth}