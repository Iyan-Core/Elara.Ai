// www/js/app.js
document.addEventListener("DOMContentLoaded", () => {
  const inputTeks = document.getElementById("input-teks");
  const tombolKirim = document.getElementById("tombol-kirim");
  const areaPesan = document.getElementById("area-pesan");

  tombolKirim.addEventListener("click", kirimPesan);
  inputTeks.addEventListener("keydown", (e) => e.key === "Enter" && kirimPesan());

  async function kirimPesan() {
    const teks = inputTeks.value.trim();
    if (!teks) return;

    // Tampilkan pesan pengguna
    tambahPesan("kamu", teks);
    inputTeks.value = "";
    tambahPesan("ai", "Sedang memproses...");

    // Panggil AI
    const jawaban = await aiService.tanya(teks);
    gantiPesanTerakhir(jawaban);
  }

  function tambahPesan(pengirim, teks) {
    const div = document.createElement("div");
    div.className = `pesan ${pengirim}`;
    div.textContent = teks;
    areaPesan.appendChild(div);
    areaPesan.scrollTop = areaPesan.scrollHeight;
  }

  function gantiPesanTerakhir(teks) {
    const terakhir = areaPesan.lastChild;
    if (terakhir) terakhir.textContent = teks;
  }
});
