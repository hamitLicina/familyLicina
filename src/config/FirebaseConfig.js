// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY8RWCulGPxDbGqV3bjAuoYMm-jJDhjT0",
  authDomain: "familylicina2024.firebaseapp.com",
  projectId: "familylicina2024",
  storageBucket: "familylicina2024.appspot.com",
  messagingSenderId: "785898641589",
  appId: "1:785898641589:web:13d094317bd84e4df486fc",
  measurementId: "G-6YHHV0MLSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

//  Set up Database and export it
export const db = getFirestore(app);

//  Set up Auth and export it
export const auth = getAuth(app);

//  Set up Storage and export it
export const storage = getStorage(app);
