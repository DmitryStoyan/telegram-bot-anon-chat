const { getMainKeyboard } = require("../utils");

function stopVipHandler(ctx) {
    // const userId = ctx.from.id;
    // const pairId = removePair(userId);

    ctx.reply(
        "Вы можете стать вип в любой момент.",
        getMainKeyboard()
    );


}

module.exports = stopVipHandler