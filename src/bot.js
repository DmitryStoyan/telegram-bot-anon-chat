const { Telegraf } = require("telegraf");
const { startHandler, nextHandler, stopHandler } = require("./handlers");
const { forwardMessage } = require("./forwardMessage");
require("dotenv").config();
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start(startHandler);
bot.command("next", nextHandler);
bot.command("stop", stopHandler);
bot.on("message", forwardMessage);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
