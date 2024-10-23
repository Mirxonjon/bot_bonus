const Operators = require("../model/allOperators")
const { readSheets } = require("./google_cloud")


let dateDayObj = {
  "1" : 31,
  "2" : 29,
  "3" : 31, 
  "4" : 30,
  "5" : 31,
  "6" : 30,
  "7" : 31,
  "8" : 31,
  "9" : 30,
  "10" : 31,
  "11" : 30,
  "12" : 31,
}


function formatDate(date) {
  if(date){
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Agar kun yoki oy bir xonali bo'lsa, oldiga 0 qo'shish
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }else {
    return null
  }



  }
  function formatTime(date) {
    const hours = String(date.getHours())
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}



const updateAllOperatorsData = async () => {
  const allOperators255 = await readSheets('255','A:R3')
  const allOperators229 = await readSheets('229','A:X3')
  
  if(allOperators255?.length) {
    let a=await Operators.find().lean()




  for(let e of allOperators255) {
    if (e.length) {
        if(e[3]?.length) {
          let findOperator = await Operators.findOne({ operator_id: e[3] }).lean();
          if (findOperator) {
        await Operators.updateOne(
          { operator_id: e[3] },
          {
            $set: {
              name_list: e[0],
              Staff: e[1],
              full_name: e[2],
              plan_call_255: e[4],
              fact_call_255: e[5],
              percentage_call_255_229: e[6],
              plan_ball: e[7],
              fact_ball: e[8],
              percentage_ball: e[9],
              plan_avarage_call_255: e[10],
              fact_avarage_call_255: e[11],
              KPI: e[12],
              Reprimand: e[13], // Примечание
              days: e[14],
              percentage: e[15],
              picure_link :e[16],
              explanatory: e[17] ,
              updatedAt: new Date(), // Set the updated time
            },
          }
        );
      } else {
        let newOperator = new Operators({
          name_list: e[0],
          Staff: e[1],
          full_name: e[2],
          operator_id: e[3],
          plan_call_255: e[4],
          fact_call_255: e[5],
          percentage_call_255_229: e[6],
          plan_ball: e[7],
          fact_ball: e[8],
          percentage_ball: e[9],
          plan_avarage_call_255: e[10],
          fact_avarage_call_255: e[11],
          KPI: e[12],
          Reprimand: e[13], // Примечание
          days: e[14],
          percentage: e[15],
          picure_link :e[16],
          explanatory: e[17] ,
          createdAt: new Date(),
        });
        await newOperator.save();
      }
    }
    }
    
    
  } 
  await updateAllOperators229(allOperators229)
  } else {
    console.log('No Users');
  }


}



const updateAllOperators229 = async (allOperators229) => {
  for(let e of allOperators229) {
    if (e.length) {
      if(e[3]?.length) {
        let findOperator = await Operators.findOne({ operator_id: e[3] }).lean();
        if (findOperator) {
          await Operators.updateOne(
            { operator_id: e[3] },
            {
              $set: {
                name_list: e[0],
                Staff: e[1],
                full_name: e[2],
                plan_call_255: e[4],
                fact_call_255: e[5],
                plan_call_229: e[6],
                fact_call_229: e[7],
                percentage_call_255_229: e[8],
                plan_ball: e[9],
                fact_ball: e[10],
                percentage_ball: e[11],
                plan_avarage_call_255: e[12],
                fact_avarage_call_255: e[13], 
                plan_avarage_call_229: e[14],
                fact_avarage_call_229: e[15],
                KPI: e[16],
                Education_time: e[17],
                Reprimand: e[19],
                days: e[20],
                percentage: e[21],
                picure_link :e[22],
                explanatory: e[23] ,
                updatedAt: new Date(), // Set the updated time
              },
            }
          );
        } else {
          let newOperator = new Operators({
            name_list: e[0],
            Staff: e[1],
            full_name: e[2],
            operator_id: e[3],
            plan_call_255: e[4],
            fact_call_255: e[5],
            plan_call_229: e[6],
            fact_call_229: e[7],
            percentage_call_255_229: e[8],
            plan_ball: e[9],
            fact_ball: e[10],
            percentage_ball: e[11],
            plan_avarage_call_255: e[12],
            fact_avarage_call_255: e[13], 
            plan_avarage_call_229: e[14],
            fact_avarage_call_229: e[15],
            KPI: e[16],
            Education_time: e[17],
            Reprimand: e[19],
            days: e[20],
            percentage: e[21],
            picure_link :e[22],
            explanatory: e[23] ,
            createdAt: new Date(),
          });
          await newOperator.save();
        }
      }
     
    }
    
  } 

}




  


  
module.exports = {
    formatDate,
    formatTime,
    dateDayObj,
    updateAllOperatorsData
}