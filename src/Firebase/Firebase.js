// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase,
push,
set,
ref,
onChildAdded } from "firebase/database";
import { getStorage, ref as storageRef } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb2wgCqVg8nKDleCJ482dQZmpCGR8zInQ",
  authDomain: "testing-95f52.firebaseapp.com",
  projectId: "testing-95f52",
  storageBucket: "testing-95f52.appspot.com",
  messagingSenderId: "412411414499",
  appId: "1:412411414499:web:9751130fabc044154782d6",
  measurementId: "G-0HS8EC214Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth   = getAuth(app);
const DATABASE = getDatabase(app)
const STORAGE = getStorage(app)

export {
    auth,
    DATABASE,
    push,
    set,
    ref,
    onChildAdded,
    STORAGE,
    storageRef
}