//Animasi underline navbar
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


//Kalkulator
function calculateLimit() {
    const functionInput = document.getElementById('functionInput').value;
    const limitValue = parseFloat(document.getElementById('limitValue').value);
    const outputElement = document.getElementById('output');

    try {
        // Langkah 1: Kompilasi fungsi menggunakan math.js
        const compiledFunction = math.compile(functionInput);

        // Langkah 2: Evaluasi fungsi numerik mendekati nilai batas
        const epsilon = 1e-6; // Nilai sangat kecil
        const leftValue = compiledFunction.evaluate({ x: limitValue - epsilon });
        const rightValue = compiledFunction.evaluate({ x: limitValue + epsilon });

        // Langkah 3: Hitung rata-rata nilai mendekati batas
        const limitApproximation = (leftValue + rightValue) / 2;

        // Membulatkan hasil ke dua angka di belakang koma
        const roundedResult = parseFloat(limitApproximation.toFixed(2));

        // Langkah 4: Cek apakah hasilnya NaN atau tak tentu
        if (isNaN(limitApproximation) || !isFinite(limitApproximation)) {
            // Jika tak tentu, gunakan penyederhanaan simbolik
            const simplifiedFunction = math.simplify(functionInput).toString();
            const simplifiedCompiled = math.compile(simplifiedFunction);
            const simplifiedValue = simplifiedCompiled.evaluate({ x: limitValue });

            outputElement.innerHTML = `<p>Bentuk tak tentu terdeteksi.<br>Hasil setelah penyederhanaan: ${simplifiedValue}</p>`;
        } else {
            // Jika hasil valid
            outputElement.innerHTML = `<p>Hasil limit: ${roundedResult}</p>`;
        }
    } catch (error) {
        // Tangani kesalahan parsing atau evaluasi
        outputElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}


