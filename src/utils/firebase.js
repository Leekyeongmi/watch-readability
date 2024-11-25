import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqlEi42aYfpB7ohLLmldTd1eX_Guj_6q4',
  authDomain: 'watch-rea.firebaseapp.com',
  projectId: 'watch-rea',
  storageBucket: 'watch-rea.firebasestorage.app',
  messagingSenderId: '216808890151',
  appId: '1:216808890151:web:bfc7476fc58a8730881302',
  measurementId: 'G-BF6BNXQE8W'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { analytics, firestore };
