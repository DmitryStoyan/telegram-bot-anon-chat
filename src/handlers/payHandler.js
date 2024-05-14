const User = require("../models/users.js");
const { Markup } = require("telegraf");
const { getSelectGenderKeyboard } = require("../utils");

async function payHandler(ctx) {
  const userId = ctx.from.id;

  try {
    // Находим пользователя в базе данных
    const user = await User.findOne({ userId });
    if (!user) {
      return ctx.reply(
        "Пользователь не найден в базе данных, авторизуйтесь с помощью команды /start"
      );
    }

    // Проверяем, оплачена ли подписка
    if (!user.isVip) {
      return ctx.reply(
        "Для доступа к этой функции необходимо приобрести VIP-статус. Вы можете это сделать с помощью команды /vip."
      );
    }

    // Отправляем клавиатуру для выбора пола собеседника
    ctx.reply("Выберите пол собеседника:", getSelectGenderKeyboard());
  } catch (error) {
    console.error("Ошибка при обработке команды /pay:", error);
    ctx.reply("Произошла ошибка. Пожалуйста, попробуйте снова.");
  }
}

module.exports = payHandler;
