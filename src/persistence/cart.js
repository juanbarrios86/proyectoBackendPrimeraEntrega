const fsMngr = require ('../utils/FsManager')

class Cart{

    constructor(path){
        this.path = path
    }

    async get(id){
        const cartItems = await fsMngr.getData(this.path)
        const cartProduct = cartItems.find(prod => prod.id === id)
        
        return cartProduct
    }
    async getAll(){
        try{            
            const cartItems = await fsMngr.getData(this.path)
            return  cartItems
        }catch(err){
            return []
        }
    }

    async addNewCartWithFirstProduct(product){
        const cartItem = { id: await fsMngr.getCurrentId(this.path) + 1 ,timestamp: Date.now(), productos: product }
        const cartItems = [...await fsMngr.getData(this.path), cartItem]
 
        await fsMngr.saveInFile(this.path,cartItems,cartItem.id)
 
        return cartItem
       
     }
        

    async addToOpenCart(product, carro)
    {
        //este metodo agrega un producto a un carrito ya abierto
       
        
       const idActual = { id: await fsMngr.getCurrentId(this.path) }
       

       const cartItems = [...await fsMngr.getData(this.path)]
       
      
       cartItems.map( function (carrito,indice){
           if (carro == carrito.id)
           {
                
               cartItems[indice].productos.push(product)
              
               
           }
       })
       
      
            
           fsMngr.saveInFile(this.path,cartItems,idActual.id)
            
           return product


    }

    async remove(id){
        //elimina un carrito entero
        let elementoBorrado
        let cartItems = await fsMngr.getData(this.path)
        console.log(cartItems)
        
        cartItems = cartItems.filter(carro =>{
            if(carro.id !== id){
                
                return carro
            }else{
                elementoBorrado = carro
            }
        } )

        await fsMngr.saveInFile(this.path,cartItems)
        return elementoBorrado
    }

    async removeprodfromcarr(carro,producto)
    {
        //elimina un producto de un carrito
          
          let producto_borrado_del_carrito
          const idActual = { id: await fsMngr.getCurrentId(this.path) }
  
         const cartItems = [...await fsMngr.getData(this.path)]
         
         cartItems.map( function (carrito,indice){
             if (carro == carrito.id)
             {
                 //aca esta el carrito del cual quiero quitar un producto
                 cartItems[indice].productos.map( function (productocarro,indiceprod){
                    if (productocarro.id == producto)
                    {
                        console.log("encontrado!")
                        producto_borrado_del_carrito = productocarro
                        cartItems[indice].productos.splice(indiceprod,1) //elimino el elemento del array

                    }
                 })
                 
             }
         })
         
        
              
             fsMngr.saveInFile(this.path,cartItems,idActual.id)
             console.log("producto borrado:")
             console.log(producto_borrado_del_carrito)
             return producto_borrado_del_carrito
  

    }


}

module.exports = new Cart('carrito.txt')