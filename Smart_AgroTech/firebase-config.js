// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMvd7sChFszzYr-nVsQOjz32WMHftnc4k",
  authDomain: "smartagrotech-4cba6.firebaseapp.com",
  projectId: "smartagrotech-4cba6",
  storageBucket: "smartagrotech-4cba6.appspot.com",
  messagingSenderId: "244930388670",
  appId: "1:244930388670:web:0589fea56b921666c7f4ef",
  measurementId: "G-Y4WWXL13C3",
  databaseURL: "https://smartagrotech-4cba6-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);  // Initialize Firebase App
const database = getDatabase(app);          // For Realtime Database (if needed)
const auth = getAuth(app);                   // Firebase Authentication

export { app, database, ref, onValue, auth };  // Export 'app' here too!
