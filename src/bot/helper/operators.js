// // const Groups = require("../../model/groups")
// // const Teacher = require("../../model/teachers")
const { bot } = require("../bot")
// const { adminKeyboardUZ, adminKeyboardRu, userKeyboardUz, userKeyboardRU, listTeachersInArray, listGroupsInArray } = require("../menu/keyboard")

const Users = require("../../model/users");
const Operators = require("../../model/allOperators");
const { updateAllOperatorsData, DeleteAllOperatorsData } = require("../../utils/time");

const  getOperators = async( msg ) => {
    const chatId = msg.from.id
    let text = msg.text
const findUser = await Users.findOne({chat_id: chatId})
let list = text.split('|')
// console.log('okkshun ');
// if()



    if(!isNaN(list[0]) || !isNaN(list[1])){
        const regex = new RegExp(text, 'i'); // 'i' bayrog'i katta-kichik harfni inobatga olmaslikni bildiradi
        const operators = await Operators.find({ operator_id: { $regex: regex } });
        // console.log(operators);
// const findOperators = await Operators.find()
    let arr = []
    for(let e of operators) {
        if(arr.length < 20) {
            arr.push([{
                text:`${e.full_name } ${e.operator_id}`,
                callback_data : `operator_${e._id}` 
            }])
    } }

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
                        if(arr.length < 50) {
                            arr.push([{
                                text:`${e.full_name } ${e.operator_id}`,
                                callback_data : `operator_${e._id}` 
                            }])
                        }

                       } 
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
    let remarks  = findOperator.explanatory
    let remarksArray = remarks?.split(';').filter(item => item.trim() !== '');
    if(remarks == `Объяснительных нет`) {
        remarksArray = [] 
        
    }

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

✍️Объяснительные: <b>${remarksArray?.length}</b>`;

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

✍️Объяснительные: <b>${remarksArray?.length}</b>`;
    }

    if(remarks != `Объяснительных нет`){
        for (let i = 0; i < remarksArray?.length; i++) {
            const item = remarksArray[i];
            const arr = item.split(':!');
            
            
            if (item) {
                let title = arr[0]?.trim();
                let link = arr[1]?.trim();
                let description = arr[2]?.trim(); 
        
                if (title && link && description) {
                    textHtml += `\n${i + 1}. <a href="${link}">${title}</a> ${description}`;
                }
            }
        }
    }


if(findOperator?.picure_link) {
    await  bot.sendPhoto( chatId, findOperator?.picure_link  ,{
        caption: textHtml, 
        parse_mode: 'HTML',
        reply_markup: {
            remove_keyboard: true,
        },});
} else{
    await  bot.sendMessage( chatId, textHtml,
        {
           parse_mode :'HTML',
           reply_markup: {
             remove_keyboard: true,
           },
         });
}


}





const notAdmistration = async (msg) => { 
    const chatId = msg.from.id
let text = `Извините, но вы не входите в руководственный состав❗️`
    await  bot.sendMessage( chatId, text,
        {
           reply_markup: {
             remove_keyboard: true,
           },
         });

}


const updateDatabase= async (msg) => { 
    const chatId = msg.from.id
    // console.log('okk');
    await updateAllOperatorsData(); 
let text = `База данных обновлена`
    await  bot.sendMessage( chatId, text,
        {
           reply_markup: {
             remove_keyboard: true,
           },
         });

}

const DeleteDatabase = async (msg) => {
  const chatId = msg.from.id;
//   console.log("okk");
    let message = await DeleteAllOperatorsData();
// console.log(message);
  let text = `База данных удаленна`;
  await bot.sendMessage(chatId, text, {
    reply_markup: {
      remove_keyboard: true,
    },
  });
};






module.exports = {
  getOperators,
  getOneOperator,
  notAdmistration,
  updateDatabase,
  DeleteDatabase,
};