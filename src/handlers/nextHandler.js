const { Markup } = require("telegraf");
const { findPairForUser, waitingUsers } = require("../pairManagement");

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

module.exports = nextHandler;
