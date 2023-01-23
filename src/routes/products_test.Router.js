import { Router } from 'express';


const ProductsTestRouter = (productsApi) => {
  const router = new Router();

  // Endpoints

  router.get('/', async (req, res) => {
    // logica
    try {
      return res.status(200).json(await productsApi.getByQuantity(5))
    } catch (error) {
      return res.status(500).json({ error: 'Error al consultar la data' })
    }

  })

  router.get('/:qty', async (req, res) => {
    // logica
    try {
      return res.status(200).json(await productsApi.getByQuantity(req.params.qty))
    } catch (error) {
      return res.status(500).json({ error: 'Error al consultar la data' })
    }

  })

  return router

}

export default ProductsTestRouter