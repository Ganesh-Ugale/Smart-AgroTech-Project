// app.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

const temperatureEl = document.getElementById('temperature');
const phEl = document.getElementById('ph');
const moistureEl = document.getElementById('moisture');
const primaryCropEl = document.getElementById('primary_crop');
const secondaryCropEl = document.getElementById('secondary_crop');
const tertiaryCropEl = document.getElementById('tertiary_crop');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is logged in

    try {
      // Query latest soil test record by timestamp (assuming you have timestamp field)
      const soilTestsRef = collection(db, "soil_tests");

      // Query soil_tests collection ordered by timestamp descending, limit 1
      const q = query(soilTestsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        temperatureEl.textContent = docData.temperature ?? "N/A";
        phEl.textContent = docData.pH ?? "N/A";
        moistureEl.textContent = docData.moisture ?? "N/A";
        primaryCropEl.textContent = docData.primary_crop ?? "N/A";
        secondaryCropEl.textContent = docData.secondary_crop ?? "N/A";
        tertiaryCropEl.textContent = docData.tertiary_crop ?? "N/A";
      } else {
        temperatureEl.textContent = "No data";
        phEl.textContent = "No data";
        moistureEl.textContent = "No data";
        primaryCropEl.textContent = "No data";
        secondaryCropEl.textContent = "No data";
        tertiaryCropEl.textContent = "No data";
      }
    } catch (error) {
      console.error("Error fetching soil data:", error);
      alert("Failed to fetch soil data");
    }

  } else {
    // User not logged in, redirect to login page
    window.location.href = "login.html";
  }
});
