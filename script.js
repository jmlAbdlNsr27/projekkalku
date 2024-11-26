const text = "Welcome to our website";
let index = 0;

function typeEffect() {
  const typingText = document.getElementById("typing-text");
  typingText.innerText = text.slice(0, index);
  index++;

  if (index > text.length) {
    setTimeout(() => {
      index = 0; // Mengulang animasi ketik setelah jeda
    }, 2000); // Jeda 2 detik sebelum memulai ulang
  }
}
// Menjalankan efek ketik setiap 150ms
setInterval(typeEffect, 150);









