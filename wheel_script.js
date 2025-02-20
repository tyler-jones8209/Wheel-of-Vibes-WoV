const families = ['Romance', 'Germanic', 'Slavic', 'Indo-Aryan', 'Semitic', 'Turkic', 'Sino-Tibetan', 'Dravidian', 'Austroasiatic',
  'Uralic', 'Afroasiatic', 'Austronesian', 'Niger-Congo', 'Korean', 'Japonic']; 
const language_sector = {
  "Romance": ["Spanish", "French", "Italian", "Portuguese", "Romanian"],
  "Germanic": ["German", "Dutch", "Swedish", "Norwegian", "Danish", "Afrikaans", "Icelandic"],
  "Slavic": ["Russian", "Polish", "Czech", "Slovak", "Bulgarian", "Serbian", "Croatian", "Ukranian"],
  "Indo-Aryan": ["Hindi", "Bengali", "Punjabi", "Marathi", "Gujarati", "Sinhala", "Urdu", "Nepali"],
  "Semitic": ["Arabic", "Hebrew", "Amharic", "Tigrinya", "Amaric"],
  "Turkic": ["Turkish", "Uzbek", "Kasakh", "Azerbaijani", "Turkmen"],
  "Sino-Tibetan": ["Mandarin", "Cantonese", "Tibetan", "Burmese", "Hakka", "Taiwanese Hokkien"],
  "Kra-Dai": ["Thai", "Lao"],
  "Dravidian": ["Tamil", "Telugu", "Kannada", "Malayalam"],
  "Austroasiatic": ["Vietnamese", "Khmer", "Mon"],
  "Uralic": ["Finnish", "Hungarian", "Estonian", "Sami"],
  "Afroasiatic": ["Egyptian", "Somali"],
  "Austronesian": ["Tagalog", "Hawaiian", "Maori", "Malagasy", "Samoan"],
  "Niger-Congo": ["Swahili", "Yoruba", "Igbo", "Zulu", "Shona"],
  "Korean": ["Korean"],
  "Japonic": ["Japanese", "Ryukyuan", "Ainu"],
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

let level = 1;
let selectedLanguage = ""; 
var wheel = null;

function renderWheel(input) {
  document.getElementById("wheel").innerHTML = "";
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
    //imageOpacity: 0.5
  };

  const container = document.getElementById("wheel");
  const wheel = new spinWheel.Wheel(container, props);

  let spinTimeout;

  wheel.onCurrentIndexChange = () => {
    clearTimeout(spinTimeout);

    const waitTime = level === 2 && wheel.items.length <= 4 ? 1000 : 600;

    console.log(wheel.rotation)

    spinTimeout = setTimeout(() => {

      let currentItem = wheel.items[wheel.getCurrentIndex()];

      if (wheel.rotation < -360) {
        let totalItems = wheel.items.length;
        let rawIndex = wheel.getCurrentIndex();

        let adjustedIndex = (rawIndex + Math.round((totalItems * 90) / 360)) % totalItems;

        currentItem = wheel.items[adjustedIndex];

        console.log(`Raw index: ${rawIndex}, Adjusted index: ${adjustedIndex}, Current index: ${wheel.getCurrentIndex()}`);

      }

      const checkIfStopped = () => {
        if (wheel.rotationSpeed === 0) {
          clearInterval(stopCheckInterval);  
          
          // Process the current item
          if (level === 1) {
            console.log(`Wheel landed on: ${currentItem.label} with length of: ${language_sector[currentItem.label].length}`);
            level = 2;
            renderWheel(language_sector[currentItem.label]);
          } else if (level === 2) {
            console.log(`The second wheel landed on: ${currentItem.label}`);

            selectedLanguage = currentItem.label;

            document.getElementById("pop-up").style.display = "block";
            document.getElementById("pop-up-text").innerHTML = `Congratulations! You got <strong>${currentItem.label}</strong>!`;
            document.getElementById("pop-up-button").style.display = "block";
          }
        }
      };

      const stopCheckInterval = setInterval(checkIfStopped, 100);

    }, waitTime);
  };
}

function goToLanguagePage() {
  if (selectedLanguage) {
    window.location.href = `language.html?lang=${encodeURIComponent(selectedLanguage)}`;
  }
}

renderWheel(families);

