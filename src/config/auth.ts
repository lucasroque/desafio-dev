import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ-ogNUhr6zF9xaW-lKpmYS12qLpeDe_Q",
  authDomain: "desafio-bycoders-app.firebaseapp.com",
  projectId: "desafio-bycoders-app",
  storageBucket: "desafio-bycoders-app.firebasestorage.app",
  messagingSenderId: "665974714396",
  appId: "1:665974714396:web:db82cdd590a767989d2fd9",
  measurementId: "G-KQGKW808M8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };