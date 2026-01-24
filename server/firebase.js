
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSOMyt9zZ_79MtU-Z6TWfko2ai0-dKRXY",
    authDomain: "hackathon-be3c4.firebaseapp.com",
    projectId: "hackathon-be3c4",
    storageBucket: "hackathon-be3c4.appspot.com",
    messagingSenderId: "351772888689",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
