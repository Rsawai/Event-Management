const mysql = require('mysql')
const cors = require('cors')
const express = require('express')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
)
app.use(cookieParser())
const salt = 5

// ####################################################################################

const View = require('./Routes/ViewRoute')
const GetEvents = require('./Routes/GetEvent')
const Edit = require('./Routes/EditRoute')
const Delete = require('./Routes/DeleteRoute')
const Add = require('./Routes/AddRoute')
const Reg = require('./Routes/RegisterRoute')
const Login = require('./Routes/LoginRoute')
const EditProfile = require('./Routes/EditProfileRoute')

// ####################################################################################

app.use('/', View)
app.use('/event', GetEvents)
app.use('/', Edit)
app.use('/', Delete)
app.use('/bookevent', Add)
app.use('/', Login)
app.use('/', Reg)
app.use('/', EditProfile)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

app.listen(8081)
console.log('listening')
