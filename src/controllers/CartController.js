const cartPersis = require('../persistence/cart')
const productPersis= require('../persistence/product')

class CartController{
    constructor(){
    }
    async listar(req,res){
        try{
            const id = req.params.id

            if( !id ) return res.json({cart: await cartPersis.getAll() })
        
            const cartProduct =  await cartPersis.get(Number(id))
        
            if( cartProduct == undefined ) return res.json({error: 'No se encontro el carrito'})
    
            return res.json({cartProduct: cartProduct})

        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
        
    }

    async agregar(req,res){   //agregar carrito con el primer articulo
        try{
            
            const product = await productPersis.get(Number(req.params.id_producto))

            if( product == undefined || product == null ) return res.json({error: 'No existe ese producto a guardar'})
            const arrayprod = []
            arrayprod.push(product)
            const cartProduct = await cartPersis.addNewCartWithFirstProduct(arrayprod)
    
            if(cartProduct == null || cartProduct == undefined ) res.json({error: 'Ha ocurrido un error'})
    
            return res.json({producto : cartProduct})
    
        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
       
    }

    async agregaralcarr(req,res){   //agregar articulo a un carrito ya abierto
        try{
            
            const product = await productPersis.get(Number(req.params.id_producto))
            const carro = req.params.id_carro // id del carro a modificar

            if( product == undefined || product == null ) return res.json({error: 'No existe ese producto a guardar'})
            
            const cartProduct = await cartPersis.addToOpenCart(product,carro)
    
            if(cartProduct == null || cartProduct == undefined ) res.json({error: 'Ha ocurrido un error'})
    
            return res.json({producto : cartProduct})
    
        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
       
    }


    async borrarcarrito(req,res){
        try{
            const carrito = await cartPersis.remove(Number(req.params.id_carro))

            if(carrito == undefined || carrito == null ) return  res.json({error: 'No se encontro el carrito'})
        
            return res.json({message: 'Se ha eliminado el carrito', carrito: carrito})

        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
       
    }

    async borrarproductodelcarrito(req,res){
        try{
            const producto = await cartPersis.removeprodfromcarr(Number(req.params.id_carro),Number(req.params.id_producto))

            if(producto == undefined || producto == null ) return  res.json({error: 'No se encontro el producto en el carrito'})
        
            return res.json({message: 'Se ha eliminado el producto en el carrito', producto: producto})

        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
    }
}

module.exports = new CartController()