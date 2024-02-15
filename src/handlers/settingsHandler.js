const { getSettingsKeyboard } = require("../utils");

function settingsHandler(ctx) {
  ctx.reply("Настройки:", getSettingsKeyboard());
}

module.exports = settingsHandler;
