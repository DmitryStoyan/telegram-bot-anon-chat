const { pairs } = require("./pairManagement");

function forwardMessage(ctx) {
  const fromId = ctx.from.id;
  if (pairs[fromId]) {
    const toId = pairs[fromId];
    // Проверяем тип сообщения и пересылаем
    if (ctx.message.voice) {
      ctx.telegram.sendVoice(toId, ctx.message.voice.file_id);
    } else if (ctx.message.text) {
      ctx.telegram.sendMessage(
        toId,
        `Сообщение от вашего собеседника: ${ctx.message.text}`
      );
    } else if (ctx.message.video) {
      ctx.telegram.sendVideo(toId, ctx.message.video.file_id);
    } else if (ctx.message.video_note) {
      ctx.telegram.sendVideoNote(toId, ctx.message.video_note.file_id);
    } else if (ctx.message.photo) {
      const photo = ctx.message.photo[ctx.message.photo.length - 1];
      ctx.telegram.sendPhoto(toId, photo.file_id);
    } else if (ctx.message.sticker) {
      ctx.telegram.sendSticker(toId, ctx.message.sticker.file_id);
    } else if (ctx.message.animation) {
      ctx.telegram.sendAnimation(toId, ctx.message.animation.file_id);
    }
  }
}

module.exports = { forwardMessage };
