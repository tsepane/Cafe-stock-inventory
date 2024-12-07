import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyAvk1mfgeQA5J7El9wslxD5gjrkJgP_4nE",
  authDomain: "cutty-s-stock.firebaseapp.com",
  projectId: "cutty-s-stock",
  storageBucket: "cutty-s-stock.appspot.com",
  messagingSenderId: "813584024684",
  appId: "1:813584024684:web:c50b8640f6bcacf4c74449",
  measurementId: "G-THT7XV14GR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Ensure db is initialized properly
const auth = getAuth(app); // Auth initialization

export { db, auth }; // Export both db and auth
