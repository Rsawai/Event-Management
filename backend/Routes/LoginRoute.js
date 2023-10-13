const mysql = require('mysql')
const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const router = express.Router()
router.use(express.json())

router.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
router.use(cookieParser())
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

router.get('/home', verification, (req, resp) => {
  return resp.json({ Status: 'Success', name: req.name })
})

// database connection#####################################################
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

const sql2 = 'SELECT * FROM `UserInfo` WHERE `email`=?'

router.post('/login', (req, res) => {
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
            //  setting token with expiry day
            const token = jwt.sign({ name }, 'secret-key', {
              expiresIn: '1d',
            })
            // stored that token in cookie
            res.cookie('token', token)

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
module.exports = router
