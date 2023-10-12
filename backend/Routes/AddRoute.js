const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
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

//booking events #############################################################
const sq =
  'INSERT INTO `Events`(`id`, `eventname`, `venue`, `Date`, `time`, `description`) VALUES(?) '
function database_execute(sq) {
  return new Promise((resolve, reject) => {
    router.post('/', (req, res) => {
      console.log('came')
      const values = [
        req.body.id,
        req.body.eventname,
        req.body.venue,
        req.body.Date,
        req.body.time,
        req.body.description,
      ]
      console.log(values, 'val')

      db.query(sq, [values], function (err, result) {
        if (err) {
          return reject(err)
        }
        console.log(res)
        return resolve(result)
      })
    })
  })
}

database_execute(sq)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

const sqlfetch = 'SELECT * FROM `Events`'

router.get('/', (req, res) => {
  const id = req.params.id
  console.log(id)
  db.query(sqlfetch, id, (error, result) => {
    console.log('came')
    if (error) {
      console.log(id)
      console.log(error, 'error')
    } else {
      // console.log(result, 'res')
      res.send(result)
    }
  })
})

module.exports = router
