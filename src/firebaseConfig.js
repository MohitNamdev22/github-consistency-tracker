// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBivlSS0tRYLP5TW20gV09BSWodcNFvU2s",
  authDomain: "github-consistency-tracker.firebaseapp.com",
  projectId: "github-consistency-tracker",
  storageBucket: "github-consistency-tracker.appspot.com",
  messagingSenderId: "774431845755",
  appId: "1:774431845755:web:eaef502fcbda0b55db61de",
  measurementId: "G-N6KMMGZ1KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
