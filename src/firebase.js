import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCVHeOu5OgFisSa1pBzSuVJAiAoXFlTGZ0",
  authDomain: "fy27-plan.firebaseapp.com",
  projectId: "fy27-plan",
  storageBucket: "fy27-plan.firebasestorage.app",
  messagingSenderId: "655277199493",
  appId: "1:655277199493:web:d72e14241f98bdb97559ec"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
