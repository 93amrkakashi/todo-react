// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2UXThXN1Jpeo-PCd3cSjraj2mfzGcmsI",
  authDomain: "todo-e8bd9.firebaseapp.com",
  projectId: "todo-e8bd9",
  storageBucket: "todo-e8bd9.appspot.com",
  messagingSenderId: "1059315204890",
  appId: "1:1059315204890:web:73878257393608f6a162a3",
  measurementId: "G-0VRLEWVG8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);