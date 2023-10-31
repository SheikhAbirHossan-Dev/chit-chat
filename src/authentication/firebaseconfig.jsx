// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXfEKYJso3UDMdmiWQTwSUa6u36KOfQl0",
  authDomain: "chit-chat-32f50.firebaseapp.com",
  projectId: "chit-chat-32f50",
  storageBucket: "chit-chat-32f50.appspot.com",
  messagingSenderId: "130852028596",
  appId: "1:130852028596:web:8f2e104cdd8b982ec757e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig