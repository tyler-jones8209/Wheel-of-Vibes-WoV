const textArray = ["spanish", "años", "también", "no mames", "français", "bonjour", "merci", "italiano", "grazie", "arrivederci",　"português", "olá", "cão", "română", "astăzi", "râde", // Romance
    "deutsch", "nederlands", "svenska", "norsk", "dansk", "afrikaans", "íslenska", // Germanic
    "русский", "polski", "čeština", "slovenčina", "български", "српски", "hrvatski", "українська", // Slavic
    "हिन्दी", "বাংলা", "ਪੰਜਾਬੀ", "मराठी", "ગુજરાતી", "සිංහල", "اردو", "नेपाली", // Indo-Aryan
    "العربية", "עברית", "አማርኛ", "ትግርኛ", "አማርኛ", // Semitic
    "türkçe", "oʻzbekcha", "қазақ", "azərbaycan dili", "türkmençe", // Turkic
    "官話", "粵語", "བོད་སྐད་", "မြန်မာစာ", "客家話", "台語", // Sino-Tibetan (Mandarin, Cantonese, Tibetan, Burmese, Hakka, Taiwanese Hokkien)
    "ไทย", "ລາວ", // Kra-Dai
    "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", // Dravidian
    "tiếng việt", "ខ្មែរ", "ဘာသာ မုန်", // Austroasiatic
    "suomi", "magyar", "eesti", "sámegiella", // Uralic
    "𓂋𓏤𓂋𓏤", "af-soomaali", // Afroasiatic (Egyptian written in hieroglyphs, Somali)
    "filipino", "ʻŌlelo Hawaiʻi", "te reo māori", "fiteny malagasy", "gagana sāmoa", // Austronesian
    "kiswahili", "èdè yorùbá", "ásụ̀sụ̀ igbo", "isiZulu", "chiShona", // Niger-Congo
    "한국어", // Korean
    "日本語", "音楽", "言語", "ひらがな", "カタカナ", "ありがとう", "こんにちは", "何", "やばい", "琉球語", "アイヌ・イタㇰ"]; // Japonic

function createRandomText() {
    const text = document.createElement("div");
    text.classList.add("random-text");
    text.innerText = textArray[Math.floor(Math.random() * textArray.length)];

    text.style.fontSize = Math.random() * 10 + 10 + "px"; // Size between 10px-50px
    text.style.left = Math.random() * 100 + "vw"; // Random horizontal position
    text.style.top = Math.random() * 100 + "vh"; // Random vertical position
    text.style.transform = `rotate(${(Math.random() * 90) - 45}deg)`; // Rotation between -45° and 45°
    text.style.color = `rgba(0, 0, 0, ${Math.random() * 0.6 + 0.2})`; // Random transparency

    document.body.appendChild(text);
}

for (let i = 0; i < 100; i++) {
    createRandomText();
}
