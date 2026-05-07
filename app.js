import { db, storage } from "./firebase-config.js";
import {
  collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const form = document.getElementById("reviewForm");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const ratingEl = document.getElementById("rating");
const imageEl = document.getElementById("image");
const previewEl = document.getElementById("preview");
const msgEl = document.getElementById("formMsg");
const submitBtn = document.getElementById("submitBtn");
const list = document.getElementById("reviewsList");
const empty = document.getElementById("emptyState");

// ---- Star input ----
const starInput = document.getElementById("starInput");
starInput.querySelectorAll("span").forEach(star => {
  star.addEventListener("click", () => {
    const v = parseInt(star.dataset.value, 10);
    ratingEl.value = v;
    starInput.querySelectorAll("span").forEach(s => {
      s.classList.toggle("active", parseInt(s.dataset.value, 10) <= v);
    });
  });
});

// ---- Image preview ----
imageEl.addEventListener("change", () => {
  const file = imageEl.files?.[0];
  if (!file) { previewEl.classList.add("hidden"); return; }
  if (file.size > 5 * 1024 * 1024) {
    setMsg("Image must be under 5MB", "error");
    imageEl.value = ""; previewEl.classList.add("hidden"); return;
  }
  previewEl.src = URL.createObjectURL(file);
  previewEl.classList.remove("hidden");
});

function setMsg(text, type = "") {
  msgEl.textContent = text;
  msgEl.className = "msg " + type;
}

function renderStars(n) {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

function formatDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// ---- Submit ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameEl.value.trim();
  const text = textEl.value.trim();
  const rating = parseInt(ratingEl.value, 10);

  if (!name || !text) return setMsg("Please fill all fields.", "error");
  if (!rating || rating < 1 || rating > 5) return setMsg("Please select a star rating.", "error");

  submitBtn.disabled = true;
  setMsg("Submitting...");

  try {
    let imageUrl = null;
    const file = imageEl.files?.[0];
    if (file) {
      const path = `reviews/${Date.now()}_${file.name}`;
      const sref = ref(storage, path);
      await uploadBytes(sref, file);
      imageUrl = await getDownloadURL(sref);
    }

    await addDoc(collection(db, "reviews"), {
      name, text, rating,
      imageUrl,
      visible: true,
      createdAt: serverTimestamp()
    });

    form.reset();
    ratingEl.value = 0;
    starInput.querySelectorAll("span").forEach(s => s.classList.remove("active"));
    previewEl.classList.add("hidden");
    setMsg("Thanks for your review!", "success");
  } catch (err) {
    console.error(err);
    setMsg("Failed to submit: " + err.message, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

// ---- Real-time listener (only visible reviews) ----
const q = query(
  collection(db, "reviews"),
  where("visible", "==", true),
  orderBy("createdAt", "desc")
);

onSnapshot(q, (snap) => {
  if (snap.empty) {
    list.innerHTML = '<p class="empty">No reviews yet. Be the first!</p>';
    return;
  }
  list.innerHTML = "";
  snap.forEach(doc => {
    const r = doc.data();
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <div class="head">
        <span class="name"></span>
        <span class="date">${formatDate(r.createdAt)}</span>
      </div>
      <div class="stars-display">${renderStars(r.rating || 0)}</div>
      <p class="text"></p>
      ${r.imageUrl ? `<img class="review-img" src="${r.imageUrl}" alt="Review photo" />` : ""}
    `;
    card.querySelector(".name").textContent = r.name || "Anonymous";
    card.querySelector(".text").textContent = r.text || "";
    list.appendChild(card);
  });
}, (err) => {
  console.error(err);
  list.innerHTML = `<p class="empty">Error loading reviews: ${err.message}</p>`;
});
