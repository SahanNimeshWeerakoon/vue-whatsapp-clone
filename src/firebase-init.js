import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB86FmihxUIWufHjFqC4b0Ur2Pmdq7gWlo",
    authDomain: "whatsapp-clone-402517.firebaseapp.com",
    projectId: "whatsapp-clone-402517",
    storageBucket: "whatsapp-clone-402517.appspot.com",
    messagingSenderId: "441393468153",
    appId: "1:441393468153:web:2b0b19b8df22445e790828"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }