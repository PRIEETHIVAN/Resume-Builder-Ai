// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDGYOsCZYBQS7Niti07c3-YgBQph2DXSU",
  authDomain: "my-resume-builder-eb4e6.firebaseapp.com",
  projectId: "my-resume-builder-eb4e6",
  storageBucket: "my-resume-builder-eb4e6.firebasestorage.app",
  messagingSenderId: "572868661438",
  appId: "your-app-id-here"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };