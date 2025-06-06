// Importing required Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMvd7sChFszzYr-nVsQOjz32WMHftnc4k",
  authDomain: "smartagrotech-4cba6.firebaseapp.com",
  projectId: "smartagrotech-4cba6",
  storageBucket: "smartagrotech-4cba6.appspot.com",
  messagingSenderId: "244930388670",
  appId: "1:244930388670:web:0589fea56b921666c7f4ef",
  measurementId: "G-Y4WWXL13C3"
};

// Initialize Firebase core
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export them for use in other JS files
export { app, db, auth, analytics };
