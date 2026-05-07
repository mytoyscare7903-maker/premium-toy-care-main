import { db, auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const loginSection = document.getElementById("loginSection");
const adminSection = document.getElementById("adminSection");
const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");
const logoutBtn = document.getElementById("logoutBtn");
const adminList = document.getElementById("adminList");

let unsub = null;

function renderStars(n) {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}
function formatDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginMsg.textContent = "Signing in...";
  loginMsg.className = "msg";
  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("password").value
    );
  } catch (err) {
    loginMsg.textContent = err.message;
    loginMsg.className = "msg error";
  }
});

logoutBtn.addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    startAdminListener();
  } else {
    loginSection.classList.remove("hidden");
    adminSection.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    if (unsub) { unsub(); unsub = null; }
    adminList.innerHTML = "";
  }
});

function startAdminListener() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  unsub = onSnapshot(q, (snap) => {
    if (snap.empty) {
      adminList.innerHTML = '<p class="empty">No reviews.</p>';
      return;
    }
    adminList.innerHTML = "";
    snap.forEach(d => adminList.appendChild(buildCard(d.id, d.data())));
  }, (err) => {
    adminList.innerHTML = `<p class="empty">Error: ${err.message}</p>`;
  });
}

function buildCard(id, r) {
  const card = document.createElement("article");
  card.className = "review-card" + (r.visible ? "" : " hidden-flag");
  card.innerHTML = `
    <div class="head">
      <span class="name"></span>
      <span class="date">${formatDate(r.createdAt)}</span>
    </div>
    <div class="stars-display">${renderStars(r.rating || 0)}</div>
    <p class="text"></p>
    ${r.imageUrl ? `<img class="review-img" src="${r.imageUrl}" alt="" />` : ""}
    <div class="admin-actions">
      <button data-act="toggle">${r.visible ? "Hide" : "Unhide"}</button>
      <button data-act="edit">Edit</button>
      <button data-act="delete" class="danger">Delete</button>
    </div>
  `;
  card.querySelector(".name").textContent = r.name || "Anonymous";
  card.querySelector(".text").textContent = r.text || "";

  card.querySelector('[data-act="toggle"]').onclick = async () => {
    await updateDoc(doc(db, "reviews", id), { visible: !r.visible });
  };
  card.querySelector('[data-act="delete"]').onclick = async () => {
    if (confirm("Delete this review permanently?")) {
      await deleteDoc(doc(db, "reviews", id));
    }
  };
  card.querySelector('[data-act="edit"]').onclick = async () => {
    const newName = prompt("Edit name:", r.name || "");
    if (newName === null) return;
    const newText = prompt("Edit review text:", r.text || "");
    if (newText === null) return;
    const newRatingStr = prompt("Edit rating (1-5):", String(r.rating || 5));
    if (newRatingStr === null) return;
    const newRating = Math.max(1, Math.min(5, parseInt(newRatingStr, 10) || r.rating));
    await updateDoc(doc(db, "reviews", id), {
      name: newName.trim() || r.name,
      text: newText.trim() || r.text,
      rating: newRating
    });
  };
  return card;
}
