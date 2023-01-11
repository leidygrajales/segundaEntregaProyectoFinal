import { Router } from 'express';

const CartRouter = (cartApi, productsApi) => {
  const router = new Router();

  // Endpoints
  router.get('/', async (req, res) => {
    try {
      return res.status(200).json(await cartApi.getAll())
    } catch (error) {
      return res.status(500).json({ error: 'Error al consultar la data' })
    }
  })

  router.post('/', async (req, res) => {
    try {
      const data = { products: [] }
      const result = await cartApi.save(data)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Error al insertar el registro' })
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      return res.status(200).json(await cartApi.deleteById(req.params.id))
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el registro' })
    }
  })

  router.get('/:id/products', async (req, res) => {
    try {
      const { products } = await cartApi.getById(req.params.id)

      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).json({ error: 'Error al consultar la data' })
    }
  })


  router.post('/:id/products', async (req, res) => {
    try {
      const cart = await cartApi.getById(req.params.id)
      const { id, title, price, thumbnail } = await productsApi.getById(req.body.id)

      const product = {
        id, title, price, thumbnail
      }
      const { products } = cart
      products.push(product)

      // cart.products = JSON.stringify(cart.products)

      const result = await cartApi.updateById(req.params.id, cart)
      return res.status(200).json({ success: true })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ error: 'Error al consultar la data' })
    }
  })


  router.delete('/:id/products/:id_prod', async (req, res) => {
    try {
      const cart = await cartApi.getById(req.params.id)
      const { products } = cart
      const filteredData = products.filter((obj) => obj.id != req.params.id_prod)
      products.splice(0, products.length, ...filteredData);

      // cart.products = JSON.stringify(cart.products)

      const result = await cartApi.updateById(req.params.id, cart)
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el carrito' })
    }
  })

  return router

}



export default CartRouter