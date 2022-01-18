const express = require('express')
const router  = express.Router()

const CartCtrl = require('../controllers/CartController')

router.get('/listar/:id?',CartCtrl.listar) //devuelve los carritos existentes o uno especifico
router.post('/agregar/:id_producto',CartCtrl.agregar) //agregar un carrito nuevo junto al primer producto
router.post('/agregaralcarr/:id_carro/:id_producto',CartCtrl.agregaralcarr) //agregar un producto a un carrito ya existente
router.delete('/borrarcarr/:id_carro',CartCtrl.borrarcarrito) //borro todo el carrito
router.delete('/borrarprodcarr/:id_carro/:id_producto',CartCtrl.borrarproductodelcarrito) //borro un producto de un carrito


module.exports = router