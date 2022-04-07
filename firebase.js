// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOzN7tQAMQTSUR9zvAa-CULkLmWJ9GH90",
  authDomain: "insta-clone-847fa.firebaseapp.com",
  projectId: "insta-clone-847fa",
  storageBucket: "insta-clone-847fa.appspot.com",
  messagingSenderId: "875690617263",
  appId: "1:875690617263:web:4fb2076dfdffdc65a1a75a"
};

// Initialize Firebase
// if the lenght of the app is null then initialize app else use the current app we already initialized, this is done to avoid mulitple instances of apps 
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db , storage };