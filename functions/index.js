const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const bodyParser = require('body-parser')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const app = express()
const main = express()

app.use((req, res, next) => {
  const apiKey = req.get('API-Key')
  if (!apiKey || apiKey !== '123') {
    res.status(401).json({ error: 'unauthorised' })
  } else {
    next()
  }
})

main.use('/api/v1', app)
main.use(bodyParser.json())

exports.dev = functions.https.onRequest(main)

app.get('/warmup', (req, res) => {
  res.send('Warming up friend.')
})

app.post('/products', async (req, res) => {
  try {

    const { name, brand, price, quantity } = req.body

    const data = {
      name,
      brand,
      price,
      quantity
    }

    const productsRef = await db.collection('products').add(data)
    const product = await productsRef.get()

    res.json({
      id: productsRef.id,
      data: product.data()
    })

  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/products', async (req, res) => {
  try {

    const productRef = await db.collection('products').get()
    const products = []

    productRef.forEach(doc => {
      products.push({
        id: doc.id,
        data: doc.data()
      })
    })

    res.json(products)

  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id

    if (!productId) throw new Error('ID is required')

    const product = await db.collection('products').doc(productId).get()

    if(!product.exists){
      throw new Error(`Product doesn't exist.`)
    } else {
      res.json({
        id: product.id,
        data: product.data()
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})