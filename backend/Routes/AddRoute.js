const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(
  cors({
    orign: ['http://localhost:3000'],
    methos: ['POST'],
    credentials: true,
  })
)

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

      db.query(sq, [values], function (err, result) {
        if (err) {
          return reject(err)
        }
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

module.exports = router
