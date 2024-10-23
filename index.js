const  express = require('express')
const mongoose = require('mongoose')
const {CronJob} = require('cron')
const  cron = require('cron')
const {  updateAllOperatorsData } = require('./src/utils/time')
const Users = require('./src/model/users')

const app = express()
require('dotenv').config()

app.use(express.json())

require('./src/bot/bot')


const Updatedate = new CronJob(
    '0 0 * * *', // Run every day at 00:00 (midnight)
    async () => {
        await updateAllOperatorsData();
    }, // onTick
    null, // onComplete
    true, // start
    'Asia/Tashkent' // timeZone
);


async function dev() {
    try {
        mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser: true
        }).then(() => console.log('mongo connect'))
        .catch((error) => console.log(error.message))
        
        app.listen(process.env.PORT, () => {
            console.log('server is runing' + process.env.PORT );
        })

    // await updateAllOperatorsData(); 
    } catch (error) {
        console.log(error.message);
    }
}

dev()

app.get('/getAllUsers',async (req, res) => {
    const users = await Users.find().lean()
        res.json({
            message: 'ok',
            users
            })
    })

    app.get('/updateOperators', async (req, res) => {
        await updateAllOperatorsData(); 
            res.json({
                message: 'update',
                })
        })