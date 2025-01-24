const families = ['Romance', 'Germanic', 'Slavic', 'Indo-Aryan', 'Semitic', 'Turkic', 'Sino-Tibetan', 'Dravidian', 'Austroasiatic',
  'Uralic', 'Afroasiatic', 'Austronesian', 'Niger-Congo', 'Japonic', 'Korean']; // Array of Language Families
const language_sector = {
  "Romance": ["Spanish", "French", "Italian", "Portuguese", "Romanian"],
  "Germanic": ["German", "Dutch", "Swedish", "Norwegian", "Danish", "Afrikaans", "Icelandic"],
  "Slavic": ["Russian", "Polish", "Czech", "Slovak", "Bulgarian", "Serbian", "Croatian", "Ukranian"],
  "Indo-Aryan": ["Hindi", "Bengali", "Punjabi", "Marathi", "Gujarati", "Sinhala", "Urdu", "Nepali"],
  "Semitic": ["Arabic", "Hebrew", "Amharic", "Tigrinya", "Amaric"],
  "Turkic": ["Turkish", "Uzbek", "Kasakh", "Azerbaijani", "Turkmen"],
  "Sino-Tibetan": ["Mandarin", "Cantonese", "Tibetan", "Burmese", "Hakka"],
  "Dravidian": ["Tamil", "Telugu", "Kannada", "Malayalam"],
  "Austroasiatic": ["Vietnamese", "Khmer", "Mon"],
  "Uralic": ["Finnish", "Hungarian", "Estonian", "Sami"],
  "Afroasiatic": ["Egyptian", "Somali"],
  "Austronesian": ["Tagalog", "Hawaiian", "Maori", "Malagasy", "Samoan"],
  "Niger-Congo": ["Swahili", "Yoruba", "Igbo", "Zulu", "Shona"]
};

const adjustColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

const baseColor = "#fc5394";

let level = 1; // 1 for the families wheel, 2 for the languages wheel

function renderWheel(input) {
  document.getElementById("wheel").innerHTML = "";
  // 1. Configure the wheel's properties:
  const wheel_items = [];
  for (let x = 0; x < input.length; x++) {
    const step = -3;
    wheel_items.push({
      label: input[x],
      backgroundColor: adjustColor(baseColor, step * x)
    });
  }
  const props = {
    items: wheel_items,
    overlayImage: "left_arrow_50px.webp",
    pointerAngle: 90,
    rotationSpeedMax: 1000,
    rotationResistance: -200,
    itemLabelFontSizeMax: 15,
    borderWidth: 2.5,
    lineWidth: 0.1,
    imageOpacity: 0.5
  };

  const container = document.getElementById("wheel");
  const wheel = new spinWheel.Wheel(container, props);

  let spinTimeout;

  // Listen for index changes
  wheel.onCurrentIndexChange = () => {
    clearTimeout(spinTimeout);
  
    // Dynamically set the wait time based on the length of the second wheel
    const waitTime = level === 2 && wheel.items.length <= 4 ? 800 : 600;
  
    spinTimeout = setTimeout(() => {
      const currentIndex = wheel.getCurrentIndex(); // Get the final index
      const currentItem = wheel.items[currentIndex];
  
      if (level === 1) {
        // If spinning the first wheel, create the second wheel
        console.log(`Wheel landed on: ${currentItem.label} with length of: ${language_sector[currentItem.label].length}`);
        level = 2;
        renderWheel(language_sector[currentItem.label]);
      } else if (level === 2) {
        // Perform a custom action after the second wheel spin
        console.log(`The second wheel landed on: ${currentItem.label}`);
      }
    }, waitTime); // Use dynamically set wait time
  };
}  

// Start with the families wheel
renderWheel(families);
