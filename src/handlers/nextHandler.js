const { Markup } = require("telegraf");
const {
  findPairForUser,
  waitingUsers,
  removePair,
  pairs,
} = require("../pairManagement");
const { getMainKeyboard } = require("../utils");

function nextHandler(ctx) {
  const userId = ctx.from.id;

  // Проверка, что пользователь и его пара находятся в текущей паре
  if (pairs[userId] && pairs[pairs[userId]]) {
    // Завершаем общение в текущей паре
    // Удаление текущей пары
    const pairId = removePair(userId);
    // Оповещение собеседника о завершении диалога, если он существует
    if (pairId) {
      ctx.telegram.sendMessage(
        pairId,
        "Ваш собеседник начал поиск нового собеседника. Отправьте /next, чтобы найти нового собеседника.",
        getMainKeyboard()
      );
    }
  }

  // Начало поиска нового собеседника для пользователя, вызвавшего /next
  // Проверяем, не находится ли пользователь уже в очереди на поиск
  if (!waitingUsers.some((u) => u.id === userId)) {
    // Добавляем пользователя в список ожидающих, если он там еще не находится
    const currentUser = { id: userId, name: ctx.from.username };
    waitingUsers.push(currentUser);

    // Вызываем функцию findPairForUser и обрабатываем результат
    findPairForUser(ctx, currentUser)
      .then((pairFound) => {
        if (!pairFound) {
          ctx.reply("Поиск нового собеседника...", getMainKeyboard());
        }
      })
      .catch((error) => {
        console.error("Ошибка при поиске пары для пользователя:", error);
        ctx.reply("Произошла ошибка. Пожалуйста, попробуйте снова.");
      });
  } else {
    // Если пользователь уже в очереди, напоминаем ему об этом
    ctx.reply("Вы уже в очереди, ожидайте подключения собеседника.");
  }
}

module.exports = nextHandler;
