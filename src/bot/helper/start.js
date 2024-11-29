const { bot } = require("../bot");

const Users = require("../../model/users");

const start = async (msg) => {
  const chatId = msg.from.id;
  const findUser = await Users.findOne({ chat_id: chatId });
  if (findUser) {
    findUser.action = "get_operators";

    await Users.findByIdAndUpdate(findUser._id, findUser, { new: true });

    return bot.sendMessage(chatId, `Bведите имя оператора или ид`);
  } else {
    let newUser = new Users({
      chat_id: chatId,
      action: "get_operators",
      access: "true",
      createdAt: new Date(),
    });
    await newUser.save();

    bot.sendMessage(chatId, `Bведите имя оператора или ид`);
  }
};

const confirmlogin = async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;
  let findUser = await Users.findOne({ chat_id: chatId }).lean();

  if (text == "db.account1") {
    findUser.action = "get_password";
    (findUser.chat_id = chatId),
      await Users.findByIdAndUpdate(findUser._id, findUser, { new: true });

    return bot.sendMessage(chatId, `Bведите пароль`);
  } else {
    bot.sendMessage(chatId, `Такой пользователь не найден`);
  }
};

const confirmPassword = async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;
  let findUser = await Users.findOne({ chat_id: chatId }).lean();

  if (text == "db.password1") {
    findUser.action = "get_operators";
    findUser.access = "true";
    (findUser.chat_id = chatId),
      await Users.findByIdAndUpdate(findUser._id, findUser, { new: true });

    return bot.sendMessage(chatId, `Bведите имя оператора или ид`);
  } else {
    bot.sendMessage(chatId, `Hеправильный пароль`);
  }
};

module.exports = {
  start,
  confirmlogin,
  confirmPassword,
};
