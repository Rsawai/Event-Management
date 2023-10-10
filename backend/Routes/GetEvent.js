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

// for events ##########################################################################

const sqlquery = 'SELECT * FROM `Events`'

router.get('/', (req, res) => {
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
// ################################################################################################
module.exports = router
