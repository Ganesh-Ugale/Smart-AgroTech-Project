// auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Registration function (you already have this)
export async function registerUser(name, email, phone, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "user", user.uid), {
      name: name,
      email: email,
      mobile: phone
    });

    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Registration error:", error.message);
    alert("Error: " + error.message);
  }
}

// New login function
export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to soil-testing.html or homepage after login success
    window.location.href = "soil-testing.html";
  } catch (error) {
    throw error;
  }
}

// Listen for form submission on login page
if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = ""; // Clear previous errors

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      await loginUser(email, password);
    } catch (error) {
      loginError.textContent = error.message;
      console.error("Login failed:", error);
    }
  });
}
