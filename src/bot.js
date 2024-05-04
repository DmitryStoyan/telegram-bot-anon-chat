const { Telegraf } = require("telegraf");
const startHandler = require("./handlers/startHandler");
const nextHandler = require("./handlers/nextHandler");
const stopHandler = require("./handlers/stopHandler");
const helpHandler = require("./handlers/helpHandler");
const payHandler = require("./handlers/payHandler");
const developmentHandler = require("./handlers/developmentHandlers");
const settingsHandler = require("./handlers/settingsHandler.js");
const { handleAgeInput } = require("./handlers/ageInputHandler");
const { handleAgeSelection } = require("./handlers/ageSelectionHandler.js");
const { forwardMessage } = require("./forwardMessage");
const {
  handleGenderSelection,
  handleMaleSelection,
  handleFemaleSelection,
  handleDeleteGenderSelection,
} = require("./handlers/genderSelectionHandler.js");
const botCommands = require("./botCommands");
const User = require("./models/users.js");
require("dotenv").config();

const mongoose = require("mongoose");
// const { createPayment, vipHandler } = require("./handlers/vipHandler2.js");
const vipHandler = require("./handlers/vipHandler.js");
const stopVipHandler = require("./handlers/stopVipHandler.js");
const createPaymentHandler = require("./handlers/createPaymentHandler.js");
const getInvoice = require("./utils/getInvoice.js");
const db = `mongodb+srv://dimastamc:${process.env.MONGODB_PASS}@anon-chat.igecksd.mongodb.net/anon-chat?retryWrites=true&w=majority`;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.telegram.setMyCommands(botCommands);

const userState = {};
// Добавляем userState в контекст Telegraf
bot.context.userState = userState;

bot.start(startHandler);

bot.command("search", (ctx) => {
  ctx.reply("Функция в разработке");
});
bot.command("next", nextHandler);
bot.command("stop", stopHandler);
bot.command("interests", developmentHandler);
bot.command("help", helpHandler);

bot.command("pay", payHandler);
bot.command("vip", vipHandler);
bot.command("link", developmentHandler);
bot.command("settings", settingsHandler);
bot.command("rules", developmentHandler);

bot.hears("🚀 Начать поиск собеседника", nextHandler);
bot.hears("🔎 Поиск собеседника по полу", (ctx) => {
  console.log(ctx);
  ctx.reply("Эта функция еще в разработке.");
});

bot.action("gender", handleGenderSelection);
bot.action("male", handleMaleSelection);
bot.action("female", handleFemaleSelection);
bot.action("delete_gender", handleDeleteGenderSelection);
bot.action("age", handleAgeSelection);
bot.action("back", settingsHandler);
bot.action("cancel_vip", stopVipHandler);
bot.action("buy_vip", (ctx) => {
  return ctx.replyWithInvoice(getInvoice(ctx.from.id));
});

// это для теста
bot.on("pre_checkout_query", (ctx) => ctx.answerPreCheckoutQuery(true));
bot.on("successful_payment", async (ctx, next) => {
  // ответ в случае положительной оплаты
  const updatedUser = await User.findOneAndUpdate(
    { userId: ctx.from.id },
    { $set: { isVip: true } },
    { upsert: true, new: true }
  );
  // console.log(updatedUser)
  await ctx.reply("Поздравляем! VIP статус успешно оплачен.");
});

bot.on("message", async (ctx) => {
  // Проверка условия для переадресации сообщения
  if (ctx.userState[ctx.from.id] && ctx.userState[ctx.from.id].awaitingAge) {
    try {
      await handleAgeInput(ctx, userState);
    } catch (error) {
      console.error("Ошибка при обработке ввода возраста:", error);
      ctx.reply("Произошла ошибка. Пожалуйста, попробуйте снова.");
    }
  } else {
    forwardMessage(ctx);
  }
});

// Промежуточный обработчик ошибок в Telegraf:
bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Ошибка при обработке сообщения:", error);
    await ctx.reply("Произошла ошибка. Пожалуйста, попробуйте снова.");
  }
});

// Глобальная обработка необработанных исключений и отклоненных промисов:
process.on("uncaughtException", (error) => {
  console.error("Необработанное исключение:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Необработанный отклоненный промис:",
    promise,
    "причина:",
    reason
  );
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
