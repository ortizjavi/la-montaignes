const Product = require('../../models/Product');

module.exports = {
  searchProducts: async (req, res, next) => {
    let sort = req.query.sort
    console.log(sort)
    let ProductsPerPage = 8;
    let pageNumber = req.query.pageNumber;
    let page = Math.max(0, pageNumber);
    if (req.query.name){ //si se hace una búsqueda, se manda name por query
      try {
          const name = req.query.name
          const regex = new RegExp(`${name}+`, 'i') // i for case insensitive
          const product = await Product.find({name: {$regex: regex}})
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            name: sort
                                        })
          const productLength = (await Product.find({name: {$regex: regex}})).length
          return res.json([productLength, product]);
        } catch (error) {
          console.log(error);
        }
    } else { //si no se hace búsqueda se mandan todos los productos(dependiendo ProductsPerPage)
      const product = await Product.find()
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            name: sort
                                        })
      const productLength = await (await Product.find()).length                      
          return res.json([productLength, product]);
    }
      
  }
}

