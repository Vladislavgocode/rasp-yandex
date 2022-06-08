module.exports = class Messages {
  start(ctx) {
    return `Приветствую, ${
      ctx.from.first_name ? ctx.from.first_name : "аноним"
    }! Набери /help и увидишь, что я могу.`;
  }
  help() {
    return `Список команд:
    /start - Перезапуск бота
    /help - Помощь
    /film - Фильм
    `;
  }
};
