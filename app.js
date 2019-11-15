const express = require('express')

const app = express()

app.get('/', (req, res)=>{
  res.send('we are on home')
})

//ROUTES HERE
app.listen(3030)