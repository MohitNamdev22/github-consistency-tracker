import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBivlSS0tRYLP5TW20gV09BSWodcNFvU2s",
    authDomain: "github-consistency-tracker.firebaseapp.com",
    projectId: "github-consistency-tracker",
    storageBucket: "github-consistency-tracker.appspot.com",
    messagingSenderId: "774431845755",
    appId: "1:774431845755:web:eaef502fcbda0b55db61de",
    measurementId: "G-N6KMMGZ1KG"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, GithubAuthProvider };
