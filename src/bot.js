const { Telegraf } = require("telegraf");
const startHandler = require("./handlers/startHandler");
const nextHandler = require("./handlers/nextHandler");
const stopHandler = require("./handlers/stopHandler");
const helpHandler = require("./handlers/helpHandler");
const developmentHandler = require("./handlers/developmentHandlers");
const { forwardMessage } = require("./forwardMessage");
const botCommands = require("./botCommands");
const User = require("./models/users.js");
require("dotenv").config();

const mongoose = require("mongoose");
const db = `mongodb+srv://dimastamc:${process.env.MONGODB_PASS}@anon-chat.igecksd.mongodb.net/anon-chat?retryWrites=true&w=majority`;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.telegram.setMyCommands(botCommands);

bot.start(startHandler);

bot.command("search", (ctx) => {
  ctx.reply("Функция в разработке");
});
bot.command("next", nextHandler);
bot.command("stop", stopHandler);
bot.command("interests", developmentHandler);
bot.command("help", helpHandler);

bot.command("pay", developmentHandler);
bot.command("vip", developmentHandler);
bot.command("link", developmentHandler);
bot.command("settings", developmentHandler);
bot.command("rules", developmentHandler);

bot.hears("🚀 Начать поиск собеседника", nextHandler);
bot.hears("🔎 Поиск собеседника по полу", (ctx) => {
  ctx.reply("Эта функция еще в разработке.");
});

bot.on("message", forwardMessage);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
