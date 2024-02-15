const { Markup } = require("telegraf");
const { getGenderKeyboard } = require("../utils");
const User = require("../models/users");

// Обработчик для начального выбора "Пол"
function handleGenderSelection(ctx) {
  ctx.editMessageText(
    "Пол не установлен. Укажите ваш пол:",
    getGenderKeyboard()
  );
}

async function handleMaleSelection(ctx) {
  const userId = ctx.callbackQuery.from.id;
  try {
    await User.updateOne(
      { userId: userId.toString() },
      { $set: { gender: "male" } }
    );
    ctx.editMessageText("Спасибо, что указали ваш пол.", {
      reply_markup: { inline_keyboard: [] },
    });
    ctx.answerCbQuery('Пол установлен как "Парень"');
  } catch (error) {
    console.error("Ошибка при обновлении пола пользователя:", error);
    ctx.answerCbQuery(
      "Произошла ошибка при обновлении пола, попробуйте снова."
    );
  }
}

async function handleFemaleSelection(ctx) {
  const userId = ctx.callbackQuery.from.id;
  try {
    await User.updateOne(
      { userId: userId.toString() },
      { $set: { gender: "female" } }
    );
    ctx.editMessageText("Спасибо, что указали ваш пол.", {
      reply_markup: { inline_keyboard: [] },
    });
    ctx.answerCbQuery('Пол установлен как "Девушка"');
  } catch (error) {
    console.error("Ошибка при обновлении пола пользователя:", error);
    ctx.answerCbQuery(
      "Произошла ошибка при обновлении пола, попробуйте снова."
    );
  }
}

async function handleDeleteGenderSelection(ctx) {
  const userId = ctx.callbackQuery.from.id;

  try {
    await User.updateOne(
      { userId: userId.toString() },
      { $unset: { gender: "" } }
    );
    ctx.editMessageText("Пол удален.", {
      reply_markup: { inline_keyboard: [] },
    });
    ctx.answerCbQuery("Пол удален");
  } catch (error) {
    console.error("Ошибка при удалении пола пользователя:", error);
    ctx.answerCbQuery("Произошла ошибка при удалении пола, попробуйте снова.");
  }
}

module.exports = {
  handleGenderSelection,
  handleMaleSelection,
  handleFemaleSelection,
  handleDeleteGenderSelection,
};
