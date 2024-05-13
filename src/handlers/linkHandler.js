const { pairs } = require("../pairManagement");

function linkHandler(ctx) {
  const userId = ctx.from.id;

  // Проверяем, что пользователь находится в диалоге
  if (pairs[userId] && pairs[pairs[userId]]) {
    // Получаем id собеседника
    const pairId = pairs[userId];

    // Получаем username пользователя и отправляем его собеседнику
    const username = ctx.from.username || "Anonymous";
    ctx.telegram.sendMessage(pairId, `Ваш собеседник: @${username}`);

    ctx.reply("Ваш username был отправлен собеседнику.");
  } else {
    ctx.reply("Вы не находитесь в диалоге.");
  }
}

module.exports = linkHandler;
