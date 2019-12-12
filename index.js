process.env.NTBA_FIX_319 = 1;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const axios = require('axios');

// Подключаем библиотеку для работы с Telegram API в переменную.
const TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
const TELEGRAM_TOKEN = '983998610:AAHe5eJ7xTEExJxgWq6w8_ZhtdURtrUEbUw';

// Токен для cats API.
const CATS_API_TOKEN = '823dba03-2254-4d4c-aef1-9b495d91451b';

// URL для cats API.
const CATS_API_URL = 'https://api.thecatapi.com/v1/images/search';

const headers = {
    'X-API-KEY': CATS_API_TOKEN
};

// Создаём бота.
// const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// bot.onText(/Котик/, async () => {
    
// });

const loadImage = async () => {
    try {
        const response = await axios.get(CATS_API_URL, { headers });
        console.log("TCL: loadImage -> response.data", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

loadImage();
