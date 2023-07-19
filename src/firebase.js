import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDG7aMXkpRMDXZHVoZ0ys3tyeJHxz5DoHQ",
  authDomain: "notego-38e1f.firebaseapp.com",
  projectId: "notego-38e1f",
  storageBucket: "notego-38e1f.appspot.com",
  messagingSenderId: "760487979187",
  appId: "1:760487979187:web:45c43be7866ffe5d24e8c6",
  measurementId: "G-94MDRZD694"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

export {auth, db}