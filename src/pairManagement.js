const { Markup } = require("telegraf");

let waitingUsers = [];
let pairs = {};

function findPairForUser(ctx, currentUser) {
  return new Promise((resolve, reject) => {
    const userIndex = waitingUsers.findIndex((u) => u.id !== currentUser.id);
    if (userIndex !== -1) {
      const pairUser = waitingUsers[userIndex];
      waitingUsers.splice(userIndex, 1);

      // Проверка наличия текущего пользователя и потенциального партнера в уже существующей паре
      if (!pairs[currentUser.id] && !pairs[pairUser.id]) {
        pairs[currentUser.id] = pairUser.id;
        pairs[pairUser.id] = currentUser.id;

        // Уведомляем обоих пользователей о соединении
        const message =
          "Собеседник найден! Начните общение.\n\nЧтобы закончить разговор, отправьте команду /stop.\nЧтобы сменить собеседника, отправьте команду /next.";
        ctx.telegram.sendMessage(
          currentUser.id,
          message,
          Markup.removeKeyboard()
        );
        ctx.telegram.sendMessage(pairUser.id, message, Markup.removeKeyboard());

        resolve(true); // Пара найдена, успешно завершаем промис
      } else {
        resolve(false); // Пользователь или собеседник уже находятся в паре
      }
    } else {
      resolve(false); // Пара не найдена, успешно завершаем промис
    }
  });
}

function removePair(userId) {
  const pairId = pairs[userId];
  if (pairId) {
    delete pairs[userId];
    delete pairs[pairId];
    return pairId;
  }
  return null;
}

module.exports = { findPairForUser, removePair, waitingUsers, pairs };
