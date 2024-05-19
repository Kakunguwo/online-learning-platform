// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "online-learning-platform-f3762.firebaseapp.com",
  projectId: "online-learning-platform-f3762",
  storageBucket: "online-learning-platform-f3762.appspot.com",
  messagingSenderId: "743966512844",
  appId: "1:743966512844:web:92279309e2a75a6388d469"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);