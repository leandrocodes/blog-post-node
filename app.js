const express = require('express')

const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

const app = express()

let firebaseConfig = {
  apiKey: "AIzaSyDS0tQhA2W_kqKTqoc0UFYlSgcG91I2DMc",
  authDomain: "stock-system-1588f.firebaseapp.com",
  databaseURL: "https://stock-system-1588f.firebaseio.com",
  projectId: "stock-system-1588f",
  storageBucket: "stock-system-1588f.appspot.com",
  messagingSenderId: "603133684836",
  appId: "1:603133684836:web:69a19e4fe0969285e5c371"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.get('/', (req, res) => {
  console.log("HTTP Get Request");
  res.send("HTTP GET Request");
  firebase.database().ref('/TestMessages').push({TestMessage: 'GET Request'});
})

app.get('/posts', (req, res) => {
  res.send('we are on posts')
})

//ROUTES HERE
app.listen(3030)