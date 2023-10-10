const mysql = require('mysql')
const cors = require('cors')
const express = require('express')
const router = express.Router()
router.use(express.json())
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET'],
    credentials: true,
  })
)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

// viewing the particular event#############################################################

const sqlfetch = 'SELECT * FROM `Events` WHERE `id`=?'

router.get('/view/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  db.query(sqlfetch, id, (error, result) => {
    console.log('came')
    if (error) {
      console.log(id)
      console.log(error, 'error')
    } else {
      console.log(result, 'res')
      res.send(result)
    }
  })
})
// ################################################################################

module.exports = router
