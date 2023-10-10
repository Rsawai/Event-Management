const mysql = require('mysql')
const express = require('express')
const cors = require('cors')

const bcrypt = require('bcrypt')

const router = express.Router()

router.use(express.json())
// router.use(bcrypt.hash())
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
)
const salt = 5

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
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

// ######################################################################

// ################# view Data during register ########################################################

const view = 'SELECT * FROM `UserInfo`'

router.get('/', (req, res) => {
  db.query(view, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
// ####################################################################################################

module.exports = router
