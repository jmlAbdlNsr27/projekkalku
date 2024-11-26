// Ambil semua elemen nav-link dan dropdown-item
const navLinks = document.querySelectorAll(".nav-link, .dropdown-item");

// Dapatkan URL halaman saat ini
const currentUrl = window.location.pathname;

// Loop melalui semua tautan
navLinks.forEach((link) => {
  // Cocokkan href dengan currentUrl
  if (link.getAttribute("href") === currentUrl) {
    // Tambahkan kelas 'active' pada link yang cocok
    link.classList.add("active");

    // Jika link ada dalam dropdown, tambahkan juga kelas 'active' ke parent dropdown
    const parentDropdown = link.closest(".dropdown");
    if (parentDropdown) {
      parentDropdown.querySelector(".nav-link").classList.add("active");
    }
  }
});