const { bot } = require("../bot")

const Users = require("../../model/users");

const  start = async( msg ) => {
    const chatId = msg.from.id
const findUser = await Users.findOne({chat_id: chatId})
    if(findUser && findUser?.access == 'true'){
        findUser.action = 'get_operators'

        await Users.findByIdAndUpdate(findUser._id,findUser,{new:true})

         return    bot.sendMessage(chatId , `Bведите имя оператора или ид` )
    }else if( findUser?.access == 'false') {
        findUser.action = 'get_login'

        await Users.findByIdAndUpdate(findUser._id,findUser,{new:true})
        bot.sendMessage(
            chatId,
            `Введите свой логин.`,
           )
    } else {
        let newUser = new Users({
            chat_id: chatId,
            action : 'get_login' ,
            access: 'false' ,
            createdAt: new Date(),
          });
          await newUser.save();

        bot.sendMessage(
            chatId,
            `Здравствуйте ${msg.from.first_name} , введите свой логин.`,
           )
    
    }



}


const confirmlogin = async (msg) => {
    const chatId = msg.from.id
    const text =  msg.text
    let findUser = await Users.findOne({chat_id: chatId}).lean()

    if(text == 'db.account1') {
        findUser.action = 'get_password'
        findUser.chat_id = chatId,


        await Users.findByIdAndUpdate(findUser._id,findUser,{new:true})

      return   bot.sendMessage(chatId ,`Bведите пароль` )
        
    } else {
        bot.sendMessage(chatId , `Такой пользователь не найден`)
    }

}

const confirmPassword = async (msg) => {
    const chatId = msg.from.id
    const text =  msg.text
    let findUser = await Users.findOne({chat_id: chatId}).lean()

    if(text == 'db.password1') {
        findUser.action = 'get_operators'
        findUser.access = 'true'
        findUser.chat_id = chatId,


        await Users.findByIdAndUpdate(findUser._id,findUser,{new:true})

      return   bot.sendMessage(chatId ,`Bведите имя оператора или ид` )
        
    } else {
        bot.sendMessage(chatId , `Hеправильный пароль`)
    }

}








module.exports = {
    start,
    confirmlogin,
    confirmPassword,
}