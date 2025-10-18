import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgbT5TjZLM0Hi4OuHSxNTGOkYN3vZKskI",
  authDomain: "tarefas-utlim8.firebaseapp.com",
  projectId: "tarefas-utlim8",
  storageBucket: "tarefas-utlim8.firebasestorage.app",
  messagingSenderId: "722021113099",
  appId: "1:722021113099:web:49a82d6ab1018df835d60e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }