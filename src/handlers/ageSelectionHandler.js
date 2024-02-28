const { getAgeKeyboard } = require("../utils");
const { userState } = require("../bot");

function handleAgeSelection(ctx) {
  // Устанавливаем флаг, ожидая ввода возраста
  ctx.userState[ctx.from.id] = { awaitingAge: true };

  ctx.editMessageText(
    "Введите ваш возраст цифрами от 9 до 99, чтобы мы могли находить вам наиболее подходящих собеседников.\n\nНапример, если вам 21 год, напишите 21:",
    getAgeKeyboard()
  );
}

module.exports = { handleAgeSelection };
