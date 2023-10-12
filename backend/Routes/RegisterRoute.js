const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const router = express.Router()
const salt = 10

router.use(express.json())
// router.use(
//   cors({
//     orign: 'http://localhost:3000',
//     methos: ['POST, GET'],
//     credentials: true,
//     optionSuccessStatus: 200,
//   })
// )

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE'),
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'),
    next()
})
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

const sql =
  'INSERT INTO `UserInfo` (`firstname`,`lastname`,`email`,`password`) VALUES(?)'

function db_post(sql) {
  return new Promise((resolve, reject) => {
    router.post('/', (req) => {
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
  .then((res) => {
    console.log(res)
    return res.JSON({ Status: 'SUCCESS' })
  })
  .catch((err) => console.log(err))

// ######################################################################

// ################# view Data during register ########################################################

const view = 'SELECT * FROM `UserInfo`'

router.get('/', (req, res) => {
  db.query(view, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      // console.log(result, 'result')
      res.send(result)
      console.log('givent back to frontend')
      // res.json(result)
    }
  })
})
// ####################################################################################################
module.exports = router
