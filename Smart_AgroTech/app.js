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
const nitrogenEl = document.getElementById('nitrogen');
const phosphorusEl = document.getElementById('phosphorus');
const potassiumEl = document.getElementById('potassium');
const primaryCropHiEl = document.getElementById('primary_crop_hi');
const secondaryCropHiEl = document.getElementById('secondary_crop_hi');
const tertiaryCropHiEl = document.getElementById('tertiary_crop_hi');
const primaryCropMrEl = document.getElementById('primary_crop_mr');
const secondaryCropMrEl = document.getElementById('secondary_crop_mr');
const tertiaryCropMrEl = document.getElementById('tertiary_crop_mr');

// Translations dictionary
const cropTranslations = {
  "Wheat": { hi: "गेहूं", mr: "गहू" },
  "Rice (Basmati)": { hi: "बासमती चावल", mr: "बासमती तांदूळ" },
  "Rice": { hi: "चावल", mr: "तांदूळ" },
  "Maize": { hi: "मक्का", mr: "मका" },
  "Sugarcane": { hi: "गन्ना", mr: "ऊस" },
  "Cotton": { hi: "कपास", mr: "कापूस" },
  "Barley": { hi: "जौ", mr: "बार्ली" },
  "Soybean": { hi: "सोयाबीन", mr: "सोयाबीन" },
  "Groundnut": { hi: "मूंगफली", mr: "शेंगदाणा" },
  "Bajra": { hi: "बाजरा", mr: "बाजरी" },
  "Jowar": { hi: "ज्वार", mr: "ज्वारी" },
  "Tur": { hi: "तूर", mr: "तूर" },
  "Chickpea": { hi: "चना", mr: "हरभरा" },

  // Vegetables
  "Tomato": { hi: "टमाटर", mr: "टोमॅटो" },
  "Onion": { hi: "प्याज", mr: "कांदा" },
  "Potato": { hi: "आलू", mr: "बटाटा" },
  "Brinjal": { hi: "बैंगन", mr: "वांगी" },
  "Cauliflower": { hi: "फूलगोभी", mr: "फुलकोबी" },
  "Cabbage": { hi: "पत्ता गोभी", mr: "कोबी" },
  "Spinach": { hi: "पालक", mr: "पालक" },
  "Carrot": { hi: "गाजर", mr: "गाजर" },
  "Okra": { hi: "भिंडी", mr: "भेंडी" },
  "Green Peas": { hi: "मटर", mr: "वाटाणे" },
  "Bitter Gourd": { hi: "करेला", mr: "कारली" },

  // Fruits
  "Mango": { hi: "आम", mr: "आंबा" },
  "Alphonso Mango": { hi: "हापुस आम", mr: "हापुस आंबा" },
  "Banana": { hi: "केला", mr: "केळा" },
  "Grapes": { hi: "अंगूर", mr: "द्राक्ष" },
  "Orange": { hi: "संतरा", mr: "संत्रा" },
  "Nagpur Orange": { hi: "नागपुर संतरा", mr: "नागपूर संत्रा" },
  "Pomegranate": { hi: "अनार", mr: "डाळिंब" },
  "Guava": { hi: "अमरुद", mr: "पेरू" },
  "Papaya": { hi: "पपीता", mr: "पपई" },
  "Watermelon": { hi: "तरबूज", mr: "कलिंगड" },
  "Custard Apple": { hi: "सीताफल", mr: "शरीफा" },

  // Flowers
  "Rose": { hi: "गुलाब", mr: "गुलाब" },
  "Jasmine": { hi: "चमेली", mr: "मोगरा" },
  "Marigold": { hi: "गेंदा", mr: "झेंडू" },
  "Hibiscus": { hi: "गुड़हल", mr: "जास्वंद" },
  "Lotus": { hi: "कमल", mr: "कमळ" },
  "Sunflower": { hi: "सूरजमुखी", mr: "सुर्यफुल" }
};

function translateCrop(crop, lang) {
  return cropTranslations[crop]?.[lang] || "N/A";
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const soilTestsRef = collection(db, "soil_sensor_data");
      const q = query(soilTestsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        const {
          temperature,
          pH,
          moisture,
          primary_crop,
          secondary_crop,
          tertiary_crop,
          nitrogen,
          phosphorus,
          potassium,
          timestamp
        } = docData;

        if (
          temperature === 0 ||
          pH === 0 ||
          moisture === 0 ||
          nitrogen === 0 ||
          phosphorus === 0 ||
          potassium === 0
        ) {
          document.querySelector(".data-container").innerHTML = `
            <h1>Soil Testing Results</h1>
            <p>No valid sensor data available at the moment.</p>
          `;
          return;
        }

        temperatureEl.textContent = temperature ?? "N/A";
        phEl.textContent = pH ?? "N/A";
        moistureEl.textContent = moisture ?? "N/A";
        nitrogenEl.textContent = nitrogen ?? "N/A";
        phosphorusEl.textContent = phosphorus ?? "N/A";
        potassiumEl.textContent = potassium ?? "N/A";

        primaryCropEl.textContent = primary_crop ?? "N/A";
        secondaryCropEl.textContent = secondary_crop ?? "N/A";
        tertiaryCropEl.textContent = tertiary_crop ?? "N/A";

        primaryCropHiEl.textContent = translateCrop(primary_crop, "hi");
        secondaryCropHiEl.textContent = translateCrop(secondary_crop, "hi");
        tertiaryCropHiEl.textContent = translateCrop(tertiary_crop, "hi");

        primaryCropMrEl.textContent = translateCrop(primary_crop, "mr");
        secondaryCropMrEl.textContent = translateCrop(secondary_crop, "mr");
        tertiaryCropMrEl.textContent = translateCrop(tertiary_crop, "mr");

        const timestampEl = document.getElementById('timestamp');
        if (timestamp && timestamp.seconds) {
          const date = new Date(timestamp.seconds * 1000);
          timestampEl.textContent = date.toLocaleString();
        } else {
          timestampEl.textContent = "-";
        }
      } else {
        document.querySelector(".data-container").innerHTML = `
          <h1>Soil Testing Results</h1>
          <p>No sensor data found.</p>
        `;
      }
    } catch (error) {
      console.error("Error fetching soil data:", error);
      alert("Failed to fetch soil data");
    }
  } else {
    window.location.href = "login.html";
  }
});
