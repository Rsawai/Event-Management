const mysql = require('mysql')
const cors = require('cors')
const express = require('express')
const router = express.Router({ mergeParams: true })

router.use(express.json())
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

// ####################################################################################

const editquery =
  'UPDATE Events SET `id` = ?, `eventname` = ?, `venue`=?, `Date`=?, `time`=?, `description`=? WHERE `id`=?'
function updateFun(editquery) {
  return new Promise((resolve, reject) => {
    router.put(`/edit/:id`, (req, res) => {
      const unique_id = req.params.id
      console.log(unique_id, 'edit')
      console.log(req.body.id, 'id')

      db.query(
        editquery,
        [
          req.body.id,
          req.body.eventname,
          req.body.venue,
          req.body.Date,
          req.body.time,
          req.body.description,
          unique_id,
        ],
        function (err, result) {
          console.log(result, 'result')
          if (result) {
            console.log('done dona done done')

            resolve(result)
            return res.json({ status: 'Success' })
          }
          console.log(err)
          return reject(err)
        }
      )
    })
  })
}
updateFun(editquery)
  .then((res) => {
    console.log(res)
    console.log('edited')
  })
  .catch((err) => {
    console.log(err)
  })

const sqlfetch = 'SELECT * FROM `Events` WHERE `id`=?'

router.get('/edit/:id', (req, res) => {
  console.log('found')
  console.log(req.params.query, 'req')
  const id = req.params.id
  console.log(id, 'id')
  db.query(sqlfetch, id, (error, result) => {
    if (error) {
      console.log(id)
      console.log(error)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})

module.exports = router
