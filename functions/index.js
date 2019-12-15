const express = require('express')
const cors = require('cors')
const functions = require('firebase-functions')
const bodyParser = require('body-parser')

const app = express()
const main = express()

app.use(cors())
app.use(require('./routes'))

app.use((req, res, next) => {
  const apiKey = req.get('API-Key')
  if (!apiKey || apiKey !== '123') {
    res.status(401).json({ error: 'unauthorised' })
  } else {
    next()
  }
})

main.use('/v1', app)
main.use(bodyParser.json())
/* app.use(firebase)  */


exports.api = functions.https.onRequest(main)