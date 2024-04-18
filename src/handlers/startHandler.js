const { Markup } = require("telegraf");
const { getMainKeyboard } = require("../utils");
const User = require("../models/users.js");

async function startHandler(ctx) {
  const telegramUser = ctx.update.message.from;
  try {
    console.log("Telegram User ID:", telegramUser.id.toString());
    const user = await User.findOne({ userId: telegramUser.id.toString() });
    if (!user) {
      const newUser = new User({
        userId: telegramUser.id.toString(),
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        username: telegramUser.username,
      });
      await newUser.save();
      ctx.reply(
        "Добро пожаловать в бот знакомств, приятного общения. Отправьте /next, чтобы начать поиск собеседника."
      );
    } else {
      ctx.reply(
        "Добро пожаловать! Отправьте /next, чтобы начать поиск собеседника."
      );
    }
  } catch (error) {
    console.error("Ошибка при регистрации пользователя", error);
    ctx.reply("Произошла ошибка при регистрации. Попробуйте снова.");
  }
}

module.exports = startHandler;
