// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "avioraai-823c6.firebaseapp.com",
  projectId: "avioraai-823c6",
  storageBucket: "avioraai-823c6.firebasestorage.app",
  messagingSenderId: "656767373727",
  appId: "1:656767373727:web:5f88759446533feff22daa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()