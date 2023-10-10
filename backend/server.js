// import mysql from 'mysql'
// import express from 'express'
// import cors from 'cors'
// import jwt from 'jsonwebtoken'
// import bcrypt, { hash } from 'bcrypt'
// import cookieParser from 'cookie-parser'

const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
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

// ####################################################################################

app.use('/', View)
app.use('/event', GetEvents)
app.use('/', Edit)
app.use('/', Delete)
app.use('/bookevent', Add)

const verification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ Error: 'not authenticated' })
  } else {
    jwt.verify(token, 'secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'no token' })
      } else {
        req.name = decoded.name
        next()
      }
    })
  }
}

app.get('/home', verification, (req, resp) => {
  return resp.json({ Status: 'Success', name: req.name })
})

// database connection#####################################################
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

// ################################################################################

// register user ############################################
const sql =
  'INSERT INTO `UserInfo` (`firstname`,`lastname`,`email`,`password`) VALUES(?)'

function db_post(sql) {
  return new Promise((resolve, reject) => {
    app.post('/', (req) => {
      console.log('request came')
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: 'error in password hashing' })

        const values = [
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          hash,
        ]

        db.query(sql, [values], function (err, result) {
          if (err) {
            return reject(err)
          }
          return resolve(result)
        })
      })
    })
  })
}

db_post(sql)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

// ######################################################################

// ################# view Data during register ########################################################

const view = 'SELECT * FROM `UserInfo`'

app.get('/', (req, res) => {
  db.query(view, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
// ####################################################################################################

//login authetication #########################################################
const sql2 = 'SELECT * FROM `UserInfo` WHERE `email`=?'

app.post('/login', (req, res) => {
  const value = req.body.email

  db.query(sql2, [value], (err, data) => {
    if (err) {
      return res.json({ Error: 'Login Error' })
    }
    console.log(data, 'data')
    if (data.length > 0) {
      console.log(req.body.password.toString())
      console.log(data[0].password)

      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, result) => {
          console.log(data[0].firstname)
          const name = data[0].firstname
          if (result) {
            // const name = data[0].firstname
            const token = jwt.sign({ name }, 'secret-key', {
              expiresIn: '1d',
            })
            res.cookie('token', token)
            // res.send(data[0].firstname)
            return res.json({ Status: 'Success', name })
          } else {
            return res.json({ Error: 'Password not match' })
          }
        }
      )
    } else {
      return res.json({ Error: 'no email present' })
    }
  })
})
// ###############################################

app.listen(8081)
console.log('listening')
