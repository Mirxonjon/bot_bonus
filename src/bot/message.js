const Users = require("../model/users");
const { bot } = require("./bot");
const {
  getOperators,
  notAdmistration,
  updateDatabase,
  DeleteDatabase,
  notUsersMessage,
} = require("./helper/operators");
const { start, confirmlogin, confirmPassword } = require("./helper/start");

bot.on("message", async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;
  const username = msg?.from?.username;

  const findUser = await Users.findOne({ chat_id: chatId }).lean();
  let usersAll = [
    "mirxonjon",
    "muhammad8999",
    "jamila_rakhimova",
    "ibonjebob",
    "abrorovs",
    "nuriddin_alisherovich",
  ];
  let adminUsersAll = ["mirxonjon", "muhammad8999"];
  if (usersAll.includes(username?.toLowerCase())) {
    if (
      text == "/start" ||
      text == "Menyu" ||
      text == "Меню"
      //   text == "/delete"
    ) {
      start(msg);
    }
    if (adminUsersAll.includes(username?.toLowerCase())) {
      if (text == "/update") {
        updateDatabase(msg);
      }

      if (text == "/delete") {
        DeleteDatabase(msg);
      }
    } else {
      notAdmistration(msg);
    }
  } else {
    notUsersMessage(msg);
  }

  if (findUser && text != "/start" && text != "/update" && text != "/delete") {
    // if(findUser?.action == 'get_login' ) {
    //     confirmlogin(msg)
    // }
    // if(findUser?.action == 'get_password') {
    //     confirmPassword(msg)
    // }

    if (findUser.action == "get_operators") {
      getOperators(msg);
    }
  }
});
