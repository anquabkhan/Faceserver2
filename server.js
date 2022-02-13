const express = require("express")
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
const knex = require('knex')
const register = require('./smart-brain-api/controllers/register')
const signin = require('./smart-brain-api/controllers/signin')
const profile = require('./smart-brain-api/controllers/profile')
const image = require('./smart-brain-api/controllers/image')



const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user: 'postgres',
        password: '7161101997',
        database: 'smart-brain'
    }
})

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'john',
//             password: 'cookies',
//             email: 'john@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'sally',
//             password: 'bananas',
//             email: 'sally@gmail.com',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }
// console.log(postgres.select('*').from('users'))
app.use(cors())



app.get('/', (req,res) => {
    // res.send(database)
    // res.send("database")
    res.json("success")
})

app.post('/signin', (req, res) => { signin.handlesignin(req, res , db ,bcrypt) })

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleprofile(req, res, db, bcrypt)}) 
// app.post('./image', ())

app.put('/image', (req,res) => { image.handleimage(req, res, db, bcrypt)})

app.post('/imageurl', (req,res) => { image.handleAPiCall(req,res)})

app.listen(3000, ()=> {
    console.log("app is tunning in the background")
})




