const Users = require('../model/users')
const {bot} = require('./bot')
const { getOperators } = require('./helper/operators')
const { start, confirmlogin, confirmPassword } = require('./helper/start')


bot.on('message' ,  async msg => {
    const chatId = msg.from.id
    const text = msg.text


    const findUser = await  Users.findOne({chat_id :chatId}).lean() 
    if(text == '/start' || text == 'Menyu' || text == 'Меню' ){
        start(msg)
    }


    if(findUser && text != '/start' && text != '/logout' ) {

        if(findUser?.action == 'get_login' ) {
            confirmlogin(msg)
        }
        if(findUser?.action == 'get_password') {
            confirmPassword(msg)
            // findStudentsInGroup(msg)
        }

        if(findUser.action == 'get_operators') {
            getOperators(msg)

        }

        

      

    }
})