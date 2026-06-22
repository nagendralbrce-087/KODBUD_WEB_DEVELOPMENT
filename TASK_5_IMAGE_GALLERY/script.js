// ── IMAGE LIST ──────────────────────────────────────────────
// To add/remove images, just edit this array.
// src   → path to your image file
// label → caption shown on hover and in lightbox
// ────────────────────────────────────────────────────────────
const images = [
  { src: "images/image1.jpg", label: "Image 01" },
  { src: "images/image2.jpg", label: "Image 02" },
  { src: "images/image3.jpg", label: "Image 03" },
  { src: "images/image4.jpg", label: "Image 04" },
  { src: "images/image5.jpg", label: "Image 05" },
  { src: "images/image6.jpg", label: "Image 06" },
];

// ── BUILD GALLERY ────────────────────────────────────────────
const gallery = document.getElementById("gallery");

images.forEach((img, i) => {
  const item = document.createElement("div");
  item.className = "gallery-item";
  item.dataset.index = i;

  const imgEl = document.createElement("img");
  imgEl.src = img.src;
  imgEl.alt = img.label;

  item.innerHTML = `
    <div class="overlay"><span class="overlay-label">${img.label}</span></div>
    <div class="zoom-icon">
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    </div>
  `;

  item.insertBefore(imgEl, item.firstChild);
  item.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(item);
});

// ── LIGHTBOX ─────────────────────────────────────────────────
const lightbox    = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption     = document.getElementById("lightboxCaption");
const counter     = document.getElementById("counter");

let current = 0;

function openLightbox(index) {
  current = index;
  updateLightbox();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const img = images[current];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.label;
  caption.textContent = img.label;
  counter.textContent = `${current + 1} / ${images.length}`;
}

function navigate(dir) {
  current = (current + dir + images.length) % images.length;
  updateLightbox();
}

document.getElementById("closeBtn").addEventListener("click", closeLightbox);
document.getElementById("backdrop").addEventListener("click", closeLightbox);
document.getElementById("prevBtn").addEventListener("click", () => navigate(-1));
document.getElementById("nextBtn").addEventListener("click", () => navigate(1));

// Keyboard controls
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape")      closeLightbox();
  if (e.key === "ArrowLeft")   navigate(-1);
  if (e.key === "ArrowRight")  navigate(1);
});