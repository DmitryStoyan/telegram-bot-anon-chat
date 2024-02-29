const { Markup } = require("telegraf");
const {
  findPairForUser,
  waitingUsers,
  removePair,
} = require("../pairManagement");
const { stopHandler } = require("./stopHandler");
const { getMainKeyboard } = require("../utils");

function nextHandler(ctx) {
  const userId = ctx.from.id;
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

  // Начало поиска нового собеседника для пользователя, вызвавшего /next
  // Проверяем, не находится ли пользователь уже в очереди на поиск
  if (!waitingUsers.some((u) => u.id === userId)) {
    // Добавляем пользователя в список ожидающих, если он там еще не находится
    const currentUser = { id: userId, name: ctx.from.username };
    waitingUsers.push(currentUser);
    ctx.reply("Поиск нового собеседника...", getMainKeyboard());
    // Пытаемся найти пару сразу после добавления в список ожидающих
    findPairForUser(ctx, currentUser);
  } else {
    // Если пользователь уже в очереди, напоминаем ему об этом
    ctx.reply("Вы уже в очереди, ожидайте подключения собеседника.");
  }
}

module.exports = nextHandler;
