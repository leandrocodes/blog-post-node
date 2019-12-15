const express = require('express')
const router = express.Router()

const db = require('../firebase')

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id

    if (!productId) throw new Error('ID is required')

    const product = await db.collection('products').doc(productId).get()

    if (!product.exists) {
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

router.patch('/:id', async (req, res) => {
  try {

    const productId = req.params.id
    if (!productId) throw new Error('ID is required')

    const data = req.body
    if (!data) throw new Error('Data is needed')

    const product = await db.collection('products').doc(productId).get()
    if (!product.exists) {
      throw new Error('Product not exists')
    } else {
      db.collection('products').doc(productId).update(data)

      res.json({
        id: productId,
        data: product.data()
      })
    }
  } catch (err) {
    res.sendStatus(500).send(err)
  }
})


router.delete('/:id', async (req, res) => {
  try {

    const productId = req.params.id
    if (!productId) throw new Error('ID is required')

    const product = await db.collection('products').doc(productId).get()
    if (!product.exists) {
      throw new Error('Product not exists')
    } else {
      db.collection('products').doc(productId).delete()

      res.json({
        id: productId
      })
    }
  } catch (err) {
    res.sendStatus(500).send(err)
  }
})


module.exports = router