const { getAgeKeyboard } = require("../utils");

function handleAgeSelection(ctx) {
  ctx.editMessageText(
    "Введите ваш возраст цифрами от 9 до 99, чтобы мы могли находить вам наиболее подходящих собеседников.\n\nНапример, если вам 21 год, напишите 21:",
    getAgeKeyboard()
  );
}

module.exports = { handleAgeSelection };
