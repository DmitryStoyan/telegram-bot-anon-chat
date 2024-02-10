// const { Telegraf, Markup } = require("telegraf");
// const { message } = require("telegraf/filters");
// const axios = require("axios");

// const botToken = "";
// const bot = new Telegraf(botToken);

// bot.telegram.setMyCommands([
//   { command: "/info", description: "Узнать возможности бота" },
//   { command: "/next", description: "Поиск собеседника" },
//   { command: "/stop", description: "Закончить разговор" },
// ]);

// let waitingUsers = [];
// let pairs = {}; // Сохраняем пары пользователей

// function findPairForUser(currentUser) {
//   const userIndex = waitingUsers.findIndex((u) => u.id !== currentUser.id);
//   if (userIndex !== -1) {
//     const pairUser = waitingUsers[userIndex];
//     waitingUsers.splice(userIndex, 1); // Удаляем найденного пользователя из списка ожидания

//     // Сохраняем пару пользователей
//     pairs[currentUser.id] = pairUser.id;
//     pairs[pairUser.id] = currentUser.id;

//     // Уведомляем обоих пользователей о соединении
//     const message =
//       "Собеседник найден! Начните общение.\n\nЧтобы закончить разговор, отправьте команду /stop.\nЧтобы сменить собеседника, отправьте команду /next.";
//     bot.telegram.sendMessage(currentUser.id, message, Markup.removeKeyboard());
//     bot.telegram.sendMessage(pairUser.id, message, Markup.removeKeyboard());

//     return true;
//   }
//   return false;
// }

// function removePair(userId) {
//   const pairId = pairs[userId];
//   if (pairId) {
//     delete pairs[userId];
//     delete pairs[pairId];
//     return pairId;
//   }
//   return null;
// }

// // Функция для создания клавиатуры
// function getMainKeyboard() {
//   return Markup.keyboard([
//     [`🚀 Начать поиск собеседника`],
//     [`🔎 Поиск собеседника по полу`],
//   ])
//     .oneTime()
//     .resize();
// }

// function forwardMessage(ctx) {
//   const fromId = ctx.from.id;
//   if (pairs[fromId]) {
//     const toId = pairs[fromId];
//     // Проверяем тип сообщения и пересылаем
//     if (ctx.message.voice) {
//       bot.telegram.sendVoice(toId, ctx.message.voice.file_id);
//     } else if (ctx.message.text) {
//       bot.telegram.sendMessage(
//         toId,
//         `Сообщение от вашего собеседника: ${ctx.message.text}`
//       );
//     } else if (ctx.message.video) {
//       bot.telegram.sendVideo(toId, ctx.message.video.file_id);
//     } else if (ctx.message.video_note) {
//       bot.telegram.sendVideoNote(toId, ctx.message.video_note.file_id);
//     } else if (ctx.message.photo) {
//       const photo = ctx.message.photo[ctx.message.photo.length - 1];
//       bot.telegram.sendPhoto(toId, photo.file_id);
//     } else if (ctx.message.sticker) {
//       bot.telegram.sendSticker(toId, ctx.message.sticker.file_id);
//     } else if (ctx.message.animation) {
//       bot.telegram.sendAnimation(toId, ctx.message.animation.file_id);
//     }
//   }
// }

// bot.start((ctx) => {
//   ctx.reply(
//     "Добро пожаловать в бот знакомств. Отправьте /next, чтобы начать поиск собеседника."
//   );
// });

// bot.command("next", (ctx) => {
//   const currentUser = { id: ctx.from.id, name: ctx.from.username };

//   if (waitingUsers.some((u) => u.id === currentUser.id)) {
//     ctx.reply("Вы уже в очереди, ожидайте подключения собеседника.");
//     return;
//   }

//   waitingUsers.push(currentUser);
//   if (!findPairForUser(currentUser)) {
//     ctx.reply("Поиск собеседника... Ожидайте.");
//   }
// });

// bot.command("stop", (ctx) => {
//   const userId = ctx.from.id;
//   const pairId = removePair(userId);

//   ctx.reply(
//     "Разговор завершен. Отправьте /next, чтобы найти нового собеседника.",
//     getMainKeyboard()
//   );

//   if (pairId) {
//     bot.telegram.sendMessage(
//       pairId,
//       "Ваш собеседник завершил разговор. Отправьте /next, чтобы найти нового собеседника.",
//       getMainKeyboard()
//     );
//     const waitingIndex = waitingUsers.findIndex((u) => u.id === pairId);
//     if (waitingIndex !== -1) {
//       waitingUsers.splice(waitingIndex, 1);
//     }
//   }
// });

// // Добавление обработчиков для реагирования на нажатия кнопок
// bot.hears(`🚀 Начать поиск собеседника`, (ctx) => {
//   // Здесь ваша логика для начала поиска собеседника
//   ctx.reply("Функция 1 в разработке");
// });

// bot.hears(`🔎 Поиск собеседника по полу`, (ctx) => {
//   // Здесь ваша логика для поиска собеседника по полу
//   ctx.reply("Функция 2 в разработке");
// });

// // Пересылка текстовых и голосовых сообщений между собеседниками
// bot.on("message", forwardMessage);

// bot.launch();

// process.once("SIGINT", () => bot.stop("SIGINT"));
// process.once("SIGTERM", () => bot.stop("SIGTERM"));
