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

function getSelectGenderKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Искать парней 👨", "selectMale"),
      Markup.button.callback("Искать девушек 👩", "selectFemale"),
    ],
    [Markup.button.callback("Удалить приоритет поиска", "delete_selectGender")],
    [Markup.button.callback("← Назад", "backPay")],
  ]);
}

function getAgeKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("Удалить возраст", "delete_age")],
    [Markup.button.callback("← Назад", "back")],
  ]);
}

function getVipKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("приобрести VIP", "buy_vip")],
    [Markup.button.callback("← отменить", "cancel_vip")],
  ]);
}

function getPayKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("7 дней за 149₽ / 1.49$", "buy_pay_7day")],
    [Markup.button.callback("1 месяц за 299₽ / 2.99$", "buy_pay_month")],
    [Markup.button.callback("12 месяцев за 999₽ / 11.99$", "buy_pay_year")],
    [Markup.button.callback("💎 Стать VIP", "buy_pay_year")],
  ]);
}

module.exports = {
  getMainKeyboard,
  getSettingsKeyboard,
  getGenderKeyboard,
  getAgeKeyboard,
  getVipKeyboard,
  getSelectGenderKeyboard,
  getPayKeyboard,
};
