const getInvoice = (id) => {
  const invoice = {
    chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
    provider_token: process.env.YOOKASSA_SECRET_KEY, // токен выданный в боте
    start_parameter: "test", //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
    title: "Vip статус на 12 месяцев", // Название продукта, 1-32 символа
    description: `  🧭 У VIP-пользователей есть приоритет в поиске: вы быстрее остальных будете находить собеседников по выбранным интересам и полу
💎 Каждый собеседник увидит ваш VIP-статус и проявит больший интерес`, // Описание продукта, 1-255 знаков
    currency: "RUB", // Трехбуквенный код валюты ISO 4217
    prices: [{ label: "rub", amount: 100 * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
    //   photo_url: 'url', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги. Людям больше нравится, когда они видят, за что платят.
    //   photo_width: 123, // Ширина фото
    //   photo_height: 123, // Длина фото
    photo_url:
      "https://avatanplus.com/files/resources/original/5747dd8625a69154f0b9540a.png",
    photo_width: 200,
    photo_height: 200,
    payload: {
      // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю
      unique_id: `${id}_${Number(new Date())}`,
      provider_token: process.env.YOOKASSA_SECRET_KEY, // через process.env надо сделать
    },
  };

  return invoice;
};

module.exports = getInvoice;