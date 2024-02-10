const { Markup } = require("telegraf");

function getMainKeyboard() {
  return Markup.keyboard([
    [`🚀 Начать поиск собеседника`],
    [`🔎 Поиск собеседника по полу`],
  ])
    .oneTime()
    .resize();
}

module.exports = { getMainKeyboard };
