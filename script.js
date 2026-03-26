// ============================
// Language
// ============================
const DEFAULT_LANG = "id";
let currentLang = localStorage.getItem("site_lang") || DEFAULT_LANG;

// ============================
// UI Text
// ============================
const UI_TEXT = {
  id: {
    copied: "Link halaman berhasil disalin.",
    copyFailed: "Gagal menyalin link. Coba browser lain.",
    online: "Online",
    open: "Buka",
    main: "Utama",
    comingSoon: "Segera Hadir",
    modalTitle: "Segera Hadir",
    modalDesc: "Fitur ini sedang disiapkan.",
    nextLangLabel: "EN",
    nextLangTitle: "Switch to English",
  },
  en: {
    copied: "Page link copied successfully.",
    copyFailed: "Failed to copy the page link. Please try another browser.",
    online: "Online",
    open: "Open",
    main: "Main",
    comingSoon: "Coming Soon",
    modalTitle: "Coming Soon",
    modalDesc: "This feature is being prepared.",
    nextLangLabel: "ID",
    nextLangTitle: "Ganti ke Bahasa Indonesia",
  },
};

// ============================
// LINKS
// ============================
const LINKS = [
  {
    key: "absensi",
    title: {
      id: "Absensi Surya Inspirasi Schools",
      en: "Surya Inspirasi Schools Attendance",
    },
    desc: {
      id: "Sistem absensi online siswa & guru",
      en: "Online attendance system for students and teachers",
    },
    icon: "fa-solid fa-user-check",
    type: "link",
    url: "https://sis-absensi.my.id",
    badge: {
      id: "Utama",
      en: "Main",
    },
    primary: true,
    hero: true,
  },
  {
    key: "academia",
    title: {
      id: "Academia",
      en: "Academia",
    },
    desc: {
      id: "Sistem akademik sekolah untuk penilaian dan administrasi",
      en: "School academic system for grading and administration",
    },
    icon: "fa-solid fa-graduation-cap",
    type: "link",
    url: "https://inspirasischools.academiaerp.com/#",
    badge: {
      id: "Buka",
      en: "Open",
    },
  },
  {
    key: "ipad",
    title: {
      id: "Form Peminjaman iPad",
      en: "iPad Loan Form",
    },
    desc: {
      id: "Ajukan peminjaman iPad secara online",
      en: "Submit an online iPad loan request",
    },
    icon: "fa-solid fa-tablet-screen-button",
    type: "link",
    url: "https://sis-ipadloan.my.id",
    badge: {
      id: "Buka",
      en: "Open",
    },
  },
  {
    key: "stock",
    title: {
      id: "Stock Keperluan Sekolah",
      en: "School Supplies Stock",
    },
    desc: {
      id: "Manajemen stok kebutuhan sekolah",
      en: "School supplies stock management",
    },
    icon: "fa-solid fa-box-archive",
    type: "link",
    url: "https://sis-asset.my.id/ga_stock_public.php",
    badge: {
      id: "Buka",
      en: "Open",
    },
  },
  {
    key: "buku",
    title: {
      id: "Manajemen Buku Sekolah",
      en: "School Book Management",
    },
    desc: {
      id: "Pengelolaan & katalog buku sekolah",
      en: "School book management and catalog",
    },
    icon: "fa-solid fa-book",
    type: "link",
    url: "https://sis-buku.my.id/katalog",
    badge: {
      id: "Buka",
      en: "Open",
    },
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
const langToggleBtn = document.getElementById("langToggleBtn");

// year
const yearEl = document.getElementById("year");

// status pill (optional)
const statusPill = document.getElementById("statusPill");

// ============================
// Helpers
// ============================
function t(key) {
  return UI_TEXT[currentLang]?.[key] || UI_TEXT[DEFAULT_LANG]?.[key] || "";
}

function getLocalizedText(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[currentLang] || value[DEFAULT_LANG] || Object.values(value)[0] || "";
}

function updateLanguageButton() {
  if (!langToggleBtn) return;
  langToggleBtn.textContent = t("nextLangLabel");
  langToggleBtn.setAttribute("title", t("nextLangTitle"));
  langToggleBtn.setAttribute("aria-label", t("nextLangTitle"));
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "id";
  localStorage.setItem("site_lang", currentLang);
  document.documentElement.setAttribute("lang", currentLang);

  renderLinks();
  setStatusOnline();
  updateLanguageButton();
}

function toggleLanguage() {
  setLanguage(currentLang === "id" ? "en" : "id");
}

function showToast(msg) {
  if (!toast) return;
  if (toastText) toastText.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal(title, desc) {
  if (!modal) return;
  modalTitle.textContent = title || t("modalTitle");
  modalDesc.textContent = desc || t("modalDesc");
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
    title.innerHTML = `<i class="${item.icon}" aria-hidden="true"></i><span>${getLocalizedText(item.title)}</span>`;

    const desc = document.createElement("div");
    desc.className = "link-desc";
    desc.textContent = getLocalizedText(item.desc);

    left.appendChild(title);
    left.appendChild(desc);

    // right
    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.alignItems = "center";
    right.style.gap = "10px";

    const badge = document.createElement("span");
    badge.className = "badge" + (isModal ? " soon" : "");
    badge.textContent = getLocalizedText(item.badge) || (isModal ? t("comingSoon") : t("open"));

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.innerHTML = `<i class="fas fa-chevron-right" aria-hidden="true"></i>`;

    right.appendChild(badge);
    right.appendChild(dot);

    el.appendChild(left);
    el.appendChild(right);

    if (isModal) {
      el.addEventListener("click", () =>
        openModal(getLocalizedText(item.modalTitle), getLocalizedText(item.modalDesc))
      );
    } else {
      el.href = item.url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }

    linksWrap.appendChild(el);
  });
}

// ============================
// Status pill (optional)
// ============================
function setStatusOnline() {
  if (!statusPill) return;
  statusPill.innerHTML = `<i class="fa-solid fa-signal"></i> ${t("online")}`;
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

  // init language
  setLanguage(currentLang);

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
        showToast(t("copied"));
      } catch {
        showToast(t("copyFailed"));
      }
    });
  }

  // language toggle
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", toggleLanguage);
  }
});
