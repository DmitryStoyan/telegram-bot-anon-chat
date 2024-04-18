const { getVipKeyboard } = require("../utils");

function vipHandler(ctx) {
  ctx.reply("приобрести vip статус", getVipKeyboard());

}

module.exports = vipHandler;
