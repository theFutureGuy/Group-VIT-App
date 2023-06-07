import { initializeApp,getApps } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGzThYeMy6-Xh2WBtbLLeXzIOlu7BoCsE",
  authDomain: "groupvite-3e680.firebaseapp.com",
  projectId: "groupvite-3e680",
  storageBucket: "groupvite-3e680.appspot.com",
  messagingSenderId: "536518030679",
  appId: "1:536518030679:web:7296970b011acc560c7a12"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// console.log(app)
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export {storage,provider,db,auth}