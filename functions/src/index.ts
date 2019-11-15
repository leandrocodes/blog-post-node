import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from "body-parser"

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

export const webApi = functions.https.onRequest(main)

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