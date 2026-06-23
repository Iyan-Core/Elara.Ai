// www/js/ai-service.js
class AiService {
  constructor() {
    this.apiKey = CONFIG.GEMINI_API_KEY;
    this.model = CONFIG.GEMINI_MODEL;
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
  }

  // Kirim pertanyaan ke AI
  async tanya(teks) {
    try {
      const respon = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: teks }]
          }],
          generationConfig: {
            maxOutputTokens: 8000, // Bisa sampai 8.000 baris
            temperature: 0.2,
            topP: 0.9
          }
        })
      });

      const data = await respon.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error(data.error?.message || "Tidak dapat jawaban");
      }
    } catch (err) {
      console.error("Error AI:", err);
      return `⚠️ Gagal terhubung: ${err.message}`;
    }
  }
}

// Jadikan bisa dipakai di halaman
window.aiService = new AiService();
