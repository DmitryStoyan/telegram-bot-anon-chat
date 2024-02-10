const { Markup } = require("telegraf");
const {
  findPairForUser,
  removePair,
  waitingUsers,
} = require("./pairManagement");
const { getMainKeyboard } = require("./utils");

function startHandler(ctx) {
  ctx.reply(
    "Добро пожаловать в бот знакомств. Отправьте /next, чтобы начать поиск собеседника.",
    getMainKeyboard()
  );
}

function nextHandler(ctx) {
  const currentUser = { id: ctx.from.id, name: ctx.from.username };

  if (waitingUsers.some((u) => u.id === currentUser.id)) {
    ctx.reply("Вы уже в очереди, ожидайте подключения собеседника.");
    return;
  }

  waitingUsers.push(currentUser);
  if (!findPairForUser(ctx, currentUser)) {
    ctx.reply("Поиск собеседника... Ожидайте.");
  }
}

function stopHandler(ctx) {
  const userId = ctx.from.id;
  const pairId = removePair(userId);

  ctx.reply(
    "Разговор завершен. Отправьте /next, чтобы найти нового собеседника.",
    getMainKeyboard()
  );

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

module.exports = { startHandler, nextHandler, stopHandler };
