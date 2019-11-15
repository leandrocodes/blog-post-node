const express = require('express')

const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

const app = express()

app.get('/', (req, res) => {
  res.send('we are on home')
})

app.get('/posts', (req, res) => {
  res.send('we are on posts')
})

//ROUTES HERE
app.listen(3030)