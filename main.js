const TelegramBot = require("node-telegram-bot-api");

const token = "7068367565:AAEuVm2nyXOq3SgJnm_mQ7tbhsuC4KUxbsM";

const options = {
  polling: true,
};

const weatherBot = new TelegramBot(token, options);

const prefix = ".";

const sayHello = new RegExp(`^${prefix}hello$`);
const newsGempa = new RegExp(`^${prefix}gempa$`);

weatherBot.onText(sayHello, (callback) => {
  weatherBot.sendMessage(callback.from.id, "hello juga");
});

weatherBot.onText(newsGempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";
  const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
  const {
    Infogempa: {
      gempa: {
        Jam,
        Magnitude,
        Tanggal,
        Dirasakan,
        Wilayah,
        Potensi,
        Kedalaman,
        Shakemap,
      },
    },
  } = await apiCall.json();

  const imageBmkg = BMKG_ENDPOINT + Shakemap;

  const resultText = `
  Waktu: ${Tanggal} | ${Jam}
  Besaran: ${Magnitude}
  Lokasi: ${Wilayah}
  Kedalaman: ${Kedalaman}
  Potensi: ${Potensi}
  Dirasakan: ${Dirasakan}
  `;

  // weatherBot.sendMessage(callback.from.id, resultText);

  weatherBot.sendPhoto(callback.from.id, imageBmkg, {
    caption: resultText,
  });
});
