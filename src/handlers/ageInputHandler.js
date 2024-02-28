const User = require("../models/users"); // Убедитесь, что путь к модели правильный
const { userState } = require("../bot");

// Функция для обработки ввода возраста
async function handleAgeInput(ctx, userState) {
  if (ctx.userState[ctx.from.id] && ctx.userState[ctx.from.id].awaitingAge) {
    const age = parseInt(ctx.message.text, 10);
    if (isNaN(age) || age < 9 || age > 99) {
      ctx.reply("Пожалуйста, введите корректный возраст от 9 до 99.");
      return;
    }

    try {
      // Обновляем или создаем запись пользователя с новым возрастом
      await User.findOneAndUpdate(
        { userId: ctx.from.id },
        { $set: { age: age } },
        { upsert: true, new: true }
      );
      ctx.reply(`Ваш возраст ${age} лет успешно сохранен.`);
    } catch (error) {
      console.log(error);
      ctx.reply("Произошла ошибка при сохранении вашего возраста.");
    }

    // Сбрасываем флаг после сохранения возраста
    delete userState[ctx.from.id].awaitingAge;
  }
}

module.exports = { handleAgeInput };
