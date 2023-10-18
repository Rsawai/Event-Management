const mysql = require('mysql')
const cors = require('cors')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const router = express.Router()
router.use(express.json())
const salt = 10
router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'PATCH'],
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
        req.email = decoded.email
        next()
      }
    })
  }
}

router.get('/home', verification, (req, resp) => {
  return resp.json({ Status: 'Success', name: req.name })
})

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

const fetch = 'SELECT * FROM `UserInfo` WHERE `email`=?'

router.get('/editprofile/:email', (req, res) => {
  const em = req.params.email

  db.query(fetch, em, (error, result) => {
    console.log('came')
    const abc = result[0].password.toString()
    console.log(abc, 'pass')
    if (error) {
      console.log(em)
      console.log(error, 'error')
    } else {
      console.log(result, 'res')
      res.status(200).send(result)
    }
  })
})

const patchQuery =
  'UPDATE `UserInfo` SET `firstname`= ?,`lastname`=? ,`email`=? WHERE `email`=?'

function db_post(patchQuery) {
  return new Promise((resolve, reject) => {
    router.patch('/editprofile/:email', (req, res) => {
      console.log('request came')
      const unique_email = req.params.email

      db.query(
        patchQuery,
        [req.body.firstname, req.body.lastname, req.body.email, unique_email],
        function (err, result) {
          if (err) {
            return reject(err)
          }
          resolve(result)
          console.log('success')
          return res.json({ Status: 'SUCCESS' })
        }
      )
    })
  })
}

db_post(patchQuery)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => console.log(err))

module.exports = router
