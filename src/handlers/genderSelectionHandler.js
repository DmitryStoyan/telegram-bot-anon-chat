const { Markup } = require("telegraf");
const { getGenderKeyboard } = require("../utils");

// Обработчик для начального выбора "Пол"
function handleGenderSelection(ctx) {
  ctx.editMessageText(
    "Пол не установлен. Укажите ваш пол:",
    getGenderKeyboard()
  );
}

function handleMaleSelection(ctx) {
  ctx.editMessageText("Спасибо, что указали ваш пол.", {
    reply_markup: { inline_keyboard: [] },
  });
  ctx.answerCbQuery('Пол установлен как "Парень"');
  // Здесь может быть логика для сохранения выбора пользователя
}

function handleFemaleSelection(ctx) {
  ctx.editMessageText("Спасибо, что указали ваш пол.", {
    reply_markup: { inline_keyboard: [] },
  });
  ctx.answerCbQuery('Пол установлен как "Девушка"');
  // Здесь может быть логика для сохранения выбора пользователя
}

function handleDeleteGenderSelection(ctx) {
  ctx.editMessageText("Спасибо, что указали ваш пол.", {
    reply_markup: { inline_keyboard: [] },
  });
  ctx.answerCbQuery("Пол удален");
  // Здесь может быть логика для удаления выбора пользователя
}

module.exports = {
  handleGenderSelection,
  handleMaleSelection,
  handleFemaleSelection,
  handleDeleteGenderSelection,
};
