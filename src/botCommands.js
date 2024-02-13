const botCommands = [
  { command: "/search", description: "🔎 Поиск собеседника" },
  {
    command: "/next",
    description: "🆕 Закончить диалог и искать нового собеседника",
  },
  { command: "/stop", description: "🔴 Закончить диалог с собеседником" },
  { command: "/interests", description: "⭐ Выбрать интересы" },
  { command: "/help", description: "🆘 Помощь по боту" },
  { command: "/pay", description: "👑 Поиск по полу" },
  { command: "/vip", description: "💎 Стать VIP-пользователем" },
  {
    command: "/link",
    description: "🔗 Отправить ссылку на ваш Телеграм собеседнику",
  },
  {
    command: "/settings",
    description: "⚙️ Настройки пола, возраста и технические настройки",
  },
  { command: "/rules", description: "📄 Правила общения в чате" },
];

module.exports = botCommands;
