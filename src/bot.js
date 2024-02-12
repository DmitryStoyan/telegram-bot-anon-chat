const { Telegraf } = require("telegraf");
const { startHandler, nextHandler, stopHandler } = require("./handlers");
const { forwardMessage } = require("./forwardMessage");
require("dotenv").config();
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.telegram.setMyCommands([
  { command: "/search", description: "🔎 Поиск собеседника" },
  {
    command: "/next",
    description: "🆕 Закончить диалог и искать нового собеседника",
  },
  { command: "/stop", description: "🔴 Закончить диалог с собеседником" },
  { command: "/interests", description: "⭐ Выбрать интересы" },
  { command: "/help", description: "🆘 Помощь по боту" },
  { command: "/pay", description: "👑 Поиск по полу" },
  { command: "/vip", description: "💎 Стать VIP-пользователем" },
  {
    command: "/link",
    description: "🔗 Отправить ссылку на ваш Телеграм собеседнику",
  },
  {
    command: "/settings",
    description: "⚙️ Настройки пола, возраста и технические настройки",
  },
  { command: "/rules", description: "📄 Правила общения в чате" },
]);

bot.start(startHandler);

bot.command("next", nextHandler);
bot.command("stop", stopHandler);

bot.hears("🚀 Начать поиск собеседника", nextHandler);
bot.hears("🔎 Поиск собеседника по полу", (ctx) => {
  ctx.reply("Эта функция еще в разработке.");
});

bot.on("message", forwardMessage);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
