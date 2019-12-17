const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Устанавливаем токен, который выдавал нам бот.
const TELEGRAM_TOKEN = '983998610:AAHe5eJ7xTEExJxgWq6w8_ZhtdURtrUEbUw';

// Токен для cats API.
const CATS_API_TOKEN = '823dba03-2254-4d4c-aef1-9b495d91451b';

// URL для cats API.
const CATS_API_URL = 'https://api.thecatapi.com/v1/images/search';

const headers = {
    'X-API-KEY': CATS_API_TOKEN
};

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  const response = await axios.get(CATS_API_URL, { headers });
  bot.sendPhoto(chatId, response.data[0].url);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});