// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYLLg1BO0hccqu1fLOGqqUjUHwjR2sCZE",

  authDomain: "storepictures-db9c6.firebaseapp.com",

  projectId: "storepictures-db9c6",

  storageBucket: "storepictures-db9c6.appspot.com",

  messagingSenderId: "152604144843",

  appId: "1:152604144843:web:9a44fdd9327fbb9502174e",

  measurementId: "G-XG4T2EPTQY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);