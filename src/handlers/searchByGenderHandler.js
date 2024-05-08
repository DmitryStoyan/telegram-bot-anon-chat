const { Markup } = require("telegraf");
const { getGenderKeyboard } = require("../utils");
const User = require("../models/users");

// function handleGenderSelection(ctx) {
//   ctx.editMessageText(
//     "Пол не установлен. Укажите ваш пол:",
//     getGenderKeyboard()
//   );
// }

async function handleSelectMaleSelection(ctx) {
  const userId = ctx.callbackQuery.from.id;
  try {
    await User.updateOne(
      { userId: userId.toString() },
      { $set: { priorityGenderOfInterlocutor: "selectMale" } }
    );
    ctx.editMessageText("Поиск собеседника будет с приоритетом на парней", {
      reply_markup: { inline_keyboard: [] },
    });
  } catch (error) {
    console.error(
      "Ошибка при выборе приоритета поиска собеседника по мужскому полу:",
      error
    );
    ctx.answerCbQuery(
      "Произошла ошибка при выборе приоритета поиска собеседника по мужскому полу, попробуйте снова."
    );
  }
}

async function handleSelectFemaleSelection(ctx) {
  const userId = ctx.callbackQuery.from.id;
  try {
    await User.updateOne(
      { userId: userId.toString() },
      { $set: { priorityGenderOfInterlocutor: "selectFemale" } }
    );
    ctx.editMessageText("Поиск собеседника будет с приоритетом на девушек.", {
      reply_markup: { inline_keyboard: [] },
    });
  } catch (error) {
    console.error(
      "Ошибка при выборе приоритета поиска собеседника по женскому полу:",
      error
    );
    ctx.answerCbQuery(
      "Произошла ошибка при выборе приоритета поиска собеседника по женскому полу, попробуйте снова."
    );
  }
}

async function handleDeleteSearchGenderSelection(ctx) {
  const userId = ctx.callbackQuery.from.id;

  try {
    await User.updateOne(
      { userId: userId.toString() },
      { $unset: { priorityGenderOfInterlocutor: "" } }
    );
    ctx.editMessageText("Приоритет поиска удален.", {
      reply_markup: { inline_keyboard: [] },
    });
  } catch (error) {
    console.error(
      "Ошибка при удалении приоритета поиска собеседника по полу:",
      error
    );
    ctx.answerCbQuery(
      "Произошла ошибка при удалении приоритета поиска собеседника по полу, попробуйте снова."
    );
  }
}

module.exports = {
  handleSelectMaleSelection,
  handleSelectFemaleSelection,
  handleDeleteSearchGenderSelection,
};
