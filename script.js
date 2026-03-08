// ============================
// LINKS (final)
// ============================
const LINKS = [
  {
    key: "absensi",
    title: "Absensi Surya Inspirasi Schools",
    desc: "Sistem absensi online siswa & guru",
    icon: "fa-solid fa-user-check",
    type: "link",
    url: "https://sis-absensi.my.id",
    badge: "Utama",
    primary: true,
    hero: true,
  },
  {
    key: "academia",
    title: "Academia",
    desc: "Sistem akademik sekolah untuk penilaian dan administrasi",
    icon: "fa-solid fa-graduation-cap",
    type: "link",
    url: "https://inspirasischools.academiaerp.com/#",
    badge: "Buka",
  },
  {
    key: "ipad",
    title: "Form Peminjaman iPad",
    desc: "Ajukan peminjaman iPad secara online",
    icon: "fa-solid fa-tablet-screen-button",
    type: "link",
    url: "https://sis-ipadloan.my.id",
    badge: "Buka",
  },
  {
    key: "stock",
    title: "Stock Keperluan Sekolah",
    desc: "Manajemen stok kebutuhan sekolah",
    icon: "fa-solid fa-box-archive",
    type: "link",
    url: "https://sis-asset.my.id/ga_stock_public.php",
    badge: "Buka",
  },
  {
    key: "buku",
    title: "Manajemen Buku Sekolah",
    desc: "Pengelolaan & katalog buku sekolah",
    icon: "fa-solid fa-book",
    type: "modal",
    modalTitle: "Manajemen Buku Sekolah",
    modalDesc: "Fitur Manajemen Buku Sekolah masih Coming Soon. Sistem sedang disiapkan.",
    badge: "Coming Soon",
  },
];

// ============================
// DOM refs
// ============================
const linksWrap = document.getElementById("links");

// modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

// toast
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

// actions
const copyBtn = document.getElementById("copyLinkBtn");

// year
const yearEl = document.getElementById("year");

// status pill (optional)
const statusPill = document.getElementById("statusPill");

// ============================
// Helpers
// ============================
function showToast(msg) {
  if (!toast) return;
  if (toastText) toastText.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal(title, desc) {
  if (!modal) return;
  modalTitle.textContent = title || "Coming Soon";
  modalDesc.textContent = desc || "Fitur ini sedang disiapkan.";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

// ============================
// Render Links
// ============================
function renderLinks() {
  if (!linksWrap) return;
  linksWrap.innerHTML = "";

  LINKS.forEach((item, idx) => {
    const isModal = item.type === "modal";
    const el = document.createElement(isModal ? "button" : "a");

    el.className =
      "animated-link" +
      (isModal ? " disabled" : "") +
      (item.primary ? " primary" : "") +
      (item.hero ? " hero" : "");

    if (isModal) el.type = "button";

    // optional: animation delay per item
    el.style.animationDelay = `${0.06 * idx}s`;

    // left
    const left = document.createElement("div");
    left.className = "link-left";

    const title = document.createElement("div");
    title.className = "link-title";
    title.innerHTML = `<i class="${item.icon}" aria-hidden="true"></i><span>${item.title}</span>`;

    const desc = document.createElement("div");
    desc.className = "link-desc";
    desc.textContent = item.desc;

    left.appendChild(title);
    left.appendChild(desc);

    // right
    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.alignItems = "center";
    right.style.gap = "10px";

    const badge = document.createElement("span");
    badge.className = "badge" + (isModal ? " soon" : "");
    badge.textContent = item.badge || (isModal ? "Coming Soon" : "Buka");

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.innerHTML = `<i class="fas fa-chevron-right" aria-hidden="true"></i>`;

    right.appendChild(badge);
    right.appendChild(dot);

    el.appendChild(left);
    el.appendChild(right);

    if (isModal) {
      el.addEventListener("click", () => openModal(item.modalTitle, item.modalDesc));
    } else {
      el.href = item.url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }

    linksWrap.appendChild(el);
  });
}

// ============================
// Status pill (opsional - sekadar indikator)
// ============================
function setStatusOnline() {
  if (!statusPill) return;
  statusPill.innerHTML = `<i class="fa-solid fa-signal"></i> Online`;
}

// ============================
// Init
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // reveal
  document.querySelectorAll(".reveal").forEach((el) => {
    requestAnimationFrame(() => el.classList.add("is-in"));
  });

  // status
  setStatusOnline();

  // render
  renderLinks();

  // modal events
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOk) modalOk.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
    });
  }

  // copy link
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link halaman berhasil disalin.");
      } catch {
        showToast("Gagal menyalin link. Coba browser lain.");
      }
    });
  }
});