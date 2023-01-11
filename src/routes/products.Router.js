import { Router } from 'express';


const ProductsRouter = (productsApi, middleware) => {
  const router = new Router();

  // Endpoints
  router.get('/', async (req, res) => {
    try {
      return res.status(200).json(await productsApi.getAll())
    } catch (error) {
      return res.status(500).json({ error: 'Error al consultar la data' })
    }

  })
  //    -->   /api/products/5
  router.get('/:id', async (req, res) => {
    // logica
    try {
      return res.status(200).json(await productsApi.getById(req.params.id))
    } catch (error) {
      return res.status(500).json({ error: 'Error al consultar la data' })
    }

  })

  // tiene permisos un admin
  router.post('/', middleware, async (req, res) => {
    // logica
    try {
      const product = req.body
      const timestamp = Date.now()
      const newItem = { timestamp, ...product }

      const result = await productsApi.save(newItem)
      return res.status(200).redirect('/')
    } catch (error) {
      return res.status(500).json({ error: 'Error al insertar el registro' })
    }

  })

  router.put('/:id', middleware, async (req, res) => {
    // logica

    try {
      return res.status(200).json(await productsApi.updateById(req.params.id, req.body))
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el registro' })
    }
  })

  router.delete('/:id', middleware, async (req, res) => {
    // logica
    try {
      return res.status(200).json(await productsApi.deleteById(req.params.id))
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el registro' })
    }

  })

  return router

}

export default ProductsRouter