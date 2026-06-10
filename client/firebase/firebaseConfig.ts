// firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWwfO03TibkIHWFKeRP3iMQYAhgw013yw",
  authDomain: "the-beacon-58243.firebaseapp.com",
  projectId: "the-beacon-58243",
  storageBucket: "the-beacon-58243.firebasestorage.app",
  messagingSenderId: "515350358021",
  appId: "1:515350358021:web:7eca88269eff076bb7946c",
  measurementId: "G-1PEPVVJB3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (browser only)
export const analytics =
  typeof window !== "undefined"
    ? getAnalytics(app)
    : null;

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Default export
export default app;