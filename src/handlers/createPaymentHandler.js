const { getMainKeyboard } = require("../utils");
const uuid = require("uuid");
const User = require("../models/users");

const { YooCheckout, ICreatePayment } = require("@a2seven/yoo-checkout");
const { getVipKeyboard } = require("../utils");
const handlePaymentExceptions = require("../exceptions/handleExeption.js");

const checkout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID,
  secretKey: process.env.YOOKASSA_SECRET_KEY,
});

const idempotenceKey = uuid.v4();

async function createPayment(value, description) {
  try {
    const payment = await checkout.createPayment(
      {
        amount: {
          value,
          currency: "RUB",
        },
        confirmation: {
          type: "redirect",
          return_url: "https://www.example.com/return_url", // после оплаты редиректнет сюда
        }, // тут либо type 'external' ->
        capture: true,
        description,
      },
      idempotenceKey
    );
    return payment;
  } catch (error) {
    handlePaymentExceptions(error);
  }
}

async function checkPayment(paymentId, ctx) {
  // создаем пеймент через кассу
  try {
    let payment = await checkout.getPayment(paymentId);

    while (payment.status === "pending") {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // без вебхука дебаунсом делаем
      payment = await checkout.getPayment(paymentId);
    }

    if (payment.status === "succeeded") {
      return true;
    } else {
      ctx.reply("Вы можете стать vip в любой момент", getMainKeyboard());

      console.log("ПЛАТЕЖ НЕ УДАЛОСЬ ОПРОСИТЬ");
      console.log(payment);
      return false;
    }
  } catch (error) {
    handlePaymentExceptions(error);
  }
}

async function createPaymentHandler(ctx) {
  const payment = await createPayment(100, "VIP status", ctx);
  console.log(payment);
  const isPaid = await checkPayment(payment.id);
  if (isPaid) {
    const updatedUser = await User.findOneAndUpdate(
      { userId: ctx.from.id },
      { $set: { isVip: true } },
      { upsert: true, new: true }
    );
    ctx.reply("вы оплатили"); // какую-то клавиатуру бахнуть сюда
  } else {
    ctx.reply("Вы можете стать вип в любой момент."); // и сюда
  }
}

async function cancelPayment(paymentId, idempotenceKey) {
  try {
    const payment = await checkout.cancelPayment(paymentId, idempotenceKey);
    // как-то ответить пользователю
  } catch (error) {
    handlePaymentExceptions(error);
  }
}

async function getPaymentList(filters) {
  // const filters = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' }, limit: 20 }; пример параметра -> получишь все пейменты

  try {
    const paymentList = await checkout.getPaymentList(filters);
    console.log(paymentList);
  } catch (error) {
    handlePaymentExceptions(error);
  }
}

module.exports = {
  createPaymentHandler,
  cancelPayment,
  getPaymentList,
  checkPayment,
};
