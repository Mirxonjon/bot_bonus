const {Schema, model} = require('mongoose')

const Operators = new Schema({
    name_list :String,
    Staff: String,
    full_name: String,
    operator_id: String,
    plan_call_255: String ,
    fact_call_255: String ,
    percentage_call_255_229: String,
    plan_call_229: String ,
    fact_call_229: String ,
    plan_ball: String ,
    fact_ball: String ,
    percentage_ball: String,
    plan_avarage_call_255 :String,
    fact_avarage_call_255 :String,
    plan_avarage_call_229 :String,
    fact_avarage_call_229 :String,
    KPI: String,
    Education_time :String,
    Reprimand :String, // Премичание
    days :String ,
    percentage : String,
    picure_link :String ,
    updateAt: Date,
    createdAt: Date

})

module.exports = model('Operators',Operators)