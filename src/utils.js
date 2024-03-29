const { Markup } = require("telegraf");

function getMainKeyboard() {
  return Markup.keyboard([
    [`🚀 Начать поиск собеседника`],
    [`🔎 Поиск собеседника по полу`],
  ])
    .oneTime()
    .resize();
}

function getSettingsKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("👨Пол👩", "gender")],
    [Markup.button.callback("📅Возраст", "age")],
  ]);
}

function getGenderKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Я парень 👨", "male"),
      Markup.button.callback("Я девушка 👩", "female"),
    ],
    [Markup.button.callback("Удалить пол", "delete_gender")],
    [Markup.button.callback("← Назад", "back")],
  ]);
}

function getAgeKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("Удалить возраст", "delete_age")],
    [Markup.button.callback("← Назад", "back")],
  ]);
}

module.exports = {
  getMainKeyboard,
  getSettingsKeyboard,
  getGenderKeyboard,
  getAgeKeyboard,
};
