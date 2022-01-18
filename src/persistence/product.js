const fsMngr = require ('../utils/FsManager')

class Product{ 
    constructor(path){
        this.path = path
    }

    async getAll(){
         const products = await fsMngr.getData(this.path)

         return products
      
    }

    async get(id){
        const products = await this.getAll()
        const product = products.find(prod => prod.id == id)
        return product
    }
    
    async create(datosart){
            
            
            const product = { id : await fsMngr.getCurrentId(this.path) + 1 , 
                              timestamps: Date.now() ,
                              nombre: datosart.nombre, 
                              descripcion: datosart.descripcion,
                              codigo: datosart.codigo,
                              foto: datosart.foto,
                              precio: datosart.precio,
                              stock: datosart.stock 
                            } 
            const newProducts = [ ...await this.getAll(), product]

            await fsMngr.saveInFile(this.path,newProducts,product.id)
 
            return product
       
    }

    async update(id, data){
        let productUpdated; 
        let products = await this.getAll()
        let newProducts = products.map((prod)=>{
            if(prod.id == id) {
                productUpdated = { ...prod, ...data}
                return productUpdated
            }
            return prod
        })

        await fsMngr.saveInFile(this.path,newProducts)

        return productUpdated
    }
    async remove(id){
        let deletedProduct
        let newProducts = await this.getAll()
        
        newProducts = newProducts.filter(prod =>{
            if(prod.id !== id){
                return prod
            }else{
                deletedProduct = prod
            }
        } )

        await fsMngr.saveInFile(this.path,newProducts)

        return deletedProduct
    }

}   

module.exports = new Product('productos.txt')