const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const router = express.Router()
router.use(express.json())
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['DELETE', 'GET'],
    credentials: true,
  })
)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

// ######################################################################################

const sqldelete = 'DELETE FROM `Events` WHERE `id`=?'

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  console.log(id, 'id')
  db.query(sqldelete, id, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
    }
  })
})

const sqlfetch = 'SELECT * FROM `Events` WHERE `id`=?'

router.get('/delete/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
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
