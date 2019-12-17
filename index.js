// process.env.NTBA_FIX_319 = 1;
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const axios = require('axios');
// const fs = require('fs');

// Подключаем библиотеку для работы с Telegram API в переменную.
const TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
const TELEGRAM_TOKEN = '983998610:AAHe5eJ7xTEExJxgWq6w8_ZhtdURtrUEbUw';

// Токен для cats API.
const CATS_API_TOKEN = '823dba03-2254-4d4c-aef1-9b495d91451b';

// URL для cats API.
const CATS_API_URL = 'https://api.thecatapi.com/v1/images/search';

require('https')
    .createServer()
    .listen(process.env.PORT || 5000)
    .on('request', function(req, res) {
        res.end('');
    });

const headers = {
    'X-API-KEY': CATS_API_TOKEN
};

console.log('Файл запущен');

// Создаём бота.
const bot = new TelegramBot(TELEGRAM_TOKEN, {
    polling: true
});

const getImageLink = async () => {
    const response = await axios.get(CATS_API_URL, { headers });
    console.log('Картинка загружена');
    return response.data[0].url;
};

bot.onText(/Котик/, async msg => {
    try {
        const chatId = msg.chat.id;
        const imageLink = await getImageLink();
        // const imageBuffer = fs.readFileSync(imageLink);
        console.log('Котик сработал');
        bot.sendPhoto(chatId, imageLink);
    } catch (e) {
        console.log(e);
    }
});
