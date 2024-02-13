const { Markup } = require("telegraf");
const { getMainKeyboard } = require("../utils");

function startHandler(ctx) {
  ctx.reply(
    "Добро пожаловать в бот знакомств. Отправьте /next, чтобы начать поиск собеседника.",
    getMainKeyboard()
  );
}

module.exports = startHandler;
