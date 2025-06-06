import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";

// --------------------
// Register Function
// --------------------
export async function registerUser(name, email, phone, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "user", user.uid), {
      name: name,
      email: email,
      phone: phone,
      createdAt: new Date()
    });

    alert("Registration successful!");
    window.location.href = "soil-testing.html";
  } catch (error) {
    console.error("Registration error:", error);
    alert("Error: " + error.message);
    throw error;
  }
}

// --------------------
// Login Function
// --------------------
export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "soil-testing.html";
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// -------------------------------
// Handle Login Form Submission
// -------------------------------
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;
    
    try {
      await loginUser(email, password);
    } catch (error) {
      document.getElementById("loginError").textContent = error.message;
    }
  });
}

// ---------------------------------
// Handle Register Form Submission
// ---------------------------------
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    const errorDiv = document.getElementById("registerError");

    if (password !== confirmPassword) {
      errorDiv.textContent = "Passwords do not match.";
      return;
    }

    try {
      await registerUser(name, email, phone, password);
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  });
}
