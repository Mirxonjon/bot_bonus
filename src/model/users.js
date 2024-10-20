const {Schema, model} = require('mongoose')

const Users = new Schema({
    chat_id :String,
    action: String,
    access: String,
    updateAt: Date,
    createdAt: Date

})

module.exports = model('Users',Users)