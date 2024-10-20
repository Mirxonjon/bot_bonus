// // const Groups = require("../../model/groups")
// // const Teacher = require("../../model/teachers")
const { bot } = require("../bot")
// const { adminKeyboardUZ, adminKeyboardRu, userKeyboardUz, userKeyboardRU, listTeachersInArray, listGroupsInArray } = require("../menu/keyboard")

const Users = require("../../model/users");
const Operators = require("../../model/allOperators");

const  getOperators = async( msg ) => {
    const chatId = msg.from.id
    let text = msg.text
const findUser = await Users.findOne({chat_id: chatId})
console.log(findUser);
let list = text.split('|')
console.log(list);



    if(!isNaN(list[0]) || !isNaN(list[1])){
        const regex = new RegExp(text, 'i'); // 'i' bayrog'i katta-kichik harfni inobatga olmaslikni bildiradi
        const operators = await Operators.find({ operator_id: { $regex: regex } });
// const findOperators = await Operators.find()
    let arr = []
    for(let e of operators) {
        arr.push([{
            text:`${e.full_name } ${e.operator_id}`,
            callback_data : `operator_${e._id}` 
        }])
    } 
        console.log(arr);
        await  bot.sendMessage( chatId, `Список операторов`,
                        {
                        //    parse_mode :'HTML',
                           reply_markup: {
                             remove_keyboard: true,
                             inline_keyboard :arr

                        
                           }})
    } else {


                           const regex = new RegExp(text, 'i'); // 'i' bayrog'i katta-kichik harfni inobatga olmaslikni bildiradi
                           const operators = await Operators.find({ full_name: { $regex: regex } });
                   // const findOperators = await Operators.find()
                   
                       let arr = []
                       for(let e of operators) {
                           arr.push([{
                               text:`${e.full_name } ${e.operator_id}`,
                               callback_data : `operator_${e._id}` 
                           }])
                       } 
                           console.log(arr);
                           await  bot.sendMessage( chatId, `Список операторов`,
                                           {
                                           //    parse_mode :'HTML',
                                              reply_markup: {
                                                remove_keyboard: true,
                                                inline_keyboard :arr
                   
                                           
                                              }})
    }



}


const getOneOperator = async (query) => {
    const chatId = query?.from.id 
    // const text = msg.text
    const splitText = query.data.split('_')
    const operatorId = splitText[1]
    const finduser = await Users.findOne({chat_id :chatId}).lean()
    const findOperator = await Operators.findOne({_id : operatorId})


    let textHtml = `
👤${findOperator.full_name} - <b>${findOperator.operator_id}</b>

💰<b>Надбавка - ${findOperator.percentage ? findOperator.percentage : ' '}%</b>
🗓<b>Рабочие дни - ${findOperator.days}</b>

🏢Штат - ${findOperator.Staff}
📞Линия - ${findOperator.name_list}
📈Выработка - <b>${findOperator.fact_call_255}</b> / ${findOperator.plan_call_255}
🕗Ср.вр разговора - <b>${findOperator.fact_avarage_call_255}</b> / ${findOperator.plan_avarage_call_255}

📌KPI - <b>${findOperator.fact_ball}</b>
📝Примечание - <b>${findOperator.Reprimand}</b>
    `;

    if(findOperator?.fact_call_229) {
        textHtml = `
👤${findOperator.full_name} - <b>${findOperator.operator_id}</b>

💰<b>Надбавка - ${findOperator.percentage}%</b>
🗓<b>Рабочие дни - ${findOperator.days}</b>

🏢Штат - ${findOperator.Staff}
📞Линия - ${findOperator.name_list}
📈Выработка (1000) - <b>${findOperator.fact_call_255}</b> / ${findOperator.plan_call_255}
🕗Ср.вр разговора (1000) - <b>${findOperator.fact_avarage_call_255}</b> / ${findOperator.plan_avarage_call_255}

📈Выработка(112) - <b>${findOperator.fact_call_229}</b> / ${findOperator.plan_call_229}
🕗Ср.вр разговора(112) - <b>${findOperator.fact_avarage_call_229}</b> / ${findOperator.plan_avarage_call_229}

📌KPI - <b>${findOperator?.fact_ball}</b>
🎓Обучение - <b>${findOperator?.Education_time}</b>
📝Примечание - <b>${findOperator?.Reprimand}</b>
    `;
    }
//     const textHtmluz = `<b> ${text} </b>
// Haqiqatan ham darsni boshlamoqchimisiz?
//     `


    await  bot.sendMessage( chatId, textHtml,
        {
           parse_mode :'HTML',
           reply_markup: {
             remove_keyboard: true,
           },
         });
}








module.exports = {
    getOperators,
    getOneOperator

}