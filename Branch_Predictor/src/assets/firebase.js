// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPPT-VM5peC6mZMDkDRd3elxvXDAeu9W8",
  authDomain: "student-verification-1a28f.firebaseapp.com",
  projectId: "student-verification-1a28f",
  storageBucket: "student-verification-1a28f.appspot.com",
  messagingSenderId: "170511022126",
  appId: "1:170511022126:web:127ce2027d0a2c5a09c7bf",
  measurementId: "G-G140J2VQEM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function setUpRecaptcha(number) {
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}
