const TelegramBot = require('node-telegram-bot-api')
const {btnOptions} = require('./options')

const token = '1987630145:AAGQfDIc62RdDJpJI8LmtAlq-tJm9uY9tSk'

const bot = new TelegramBot(token, { polling: true }) // polling - ?

bot.setMyCommands([
    { command: '/start', description: 'Запуск бота' },
    { command: '/info', description: 'Полезная нформация' },
    { command: '/timetable', description: 'Расписание в шараге' },
])

const start = () => {
    bot.on('message', async msg => {
        const { text, chat } = msg
        // console.log(text, chat);

        switch (text) {
            case '/start':
                await bot.sendMessage(chat.id, 'Добро пожаловать, мой господин!')
                break;

            case '/info':
                await bot.sendMessage(chat.id, 'Тут будет полезная для тебя информация')
                break;

            case '/timetable':
                await bot.sendMessage(chat.id, 'А тут будет расписание занятий из твоей любимой шараги', btnOptions)
                break;

            default:
                await bot.sendMessage(chat.id, 'Чушь несешь...')
                break;
        }
    })
}

bot.on('callback_query', async msg => {
    const {data} = msg
    const chatId = msg.message.chat.id
    console.log(data, chatId);
})

start()