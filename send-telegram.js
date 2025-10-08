export async function handler(event, context) {
  const { name, phone, vehicle, message } = JSON.parse(event.body);

  const text = `
🚗 *Нова заявка на техогляд*  
📅 Дата: ${new Date().toLocaleString("uk-UA")}  
👤 Ім'я: ${name}  
📞 Телефон: ${phone}  
🚘 Категорія транспорту: ${vehicle}  
💬 Коментар: ${message || "—"}
`;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}