// Подключаем библиотеку для работы с Telegram API в переменную.
const TelegramBot = require('node-telegram-bot-api');
// Подключаем библиотеку для работы с http запросами.
const axios = require('axios');
const request = require('request');

// Устанавливаем токен, который выдавал нам бот.
const TELEGRAM_TOKEN = '983998610:AAHe5eJ7xTEExJxgWq6w8_ZhtdURtrUEbUw';

// Токен для cats API.
const CATS_API_TOKEN = '823dba03-2254-4d4c-aef1-9b495d91451b';

// URL для cats API.
const CATS_API_URL = 'https://api.thecatapi.com/v1/images/search';

// Костыль, чтобы heroku не ругался на $PORT.
const http = require('http');
const port = process.env.PORT || 3000;
const requestHandler = (request, response) => {
    console.log(request.url);
    response.end('Hello Node.js Server!');
};
const server = http.createServer(requestHandler);
server.listen(port, err => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});

// Костыль для предотвращения ухода приложения в простой.
const ping = () =>
    request('https://telegram--jokes-bot.herokuapp.com/', (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print body of response received
    });
setInterval(ping, 5 * 60 * 1000); // I have set to 5 mins interval

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

bot.onText(/Полина хочет котика|Хочу котика/, async msg => {
    try {
        const chatId = msg.chat.id;
        const imageLink = await getImageLink();
        console.log('Котик сработал');
        bot.sendPhoto(chatId, imageLink);
    } catch (e) {
        console.log(e);
    }
});
