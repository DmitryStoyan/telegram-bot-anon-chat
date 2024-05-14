const { Markup } = require("telegraf");
const { removePair, waitingUsers } = require("../pairManagement");
const { getMainKeyboard } = require("../utils");

let userWantsToSearch = {};

function stopHandler(ctx) {
  const userId = ctx.from.id;
  const pairId = removePair(userId);

  ctx.reply(
    "Разговор завершен. Отправьте /next, чтобы найти нового собеседника.",
    getMainKeyboard()
  );

  userWantsToSearch[userId] = false;

  if (pairId) {
    ctx.telegram.sendMessage(
      pairId,
      "Ваш собеседник завершил разговор. Отправьте /next, чтобы найти нового собеседника.",
      getMainKeyboard()
    );
    const waitingIndex = waitingUsers.findIndex((u) => u.id === pairId);
    if (waitingIndex !== -1) {
      waitingUsers.splice(waitingIndex, 1);
    }
  }
}

module.exports = { stopHandler, userWantsToSearch };
