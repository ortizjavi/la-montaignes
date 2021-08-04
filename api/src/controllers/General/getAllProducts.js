const Product = require('../../models/Product');

module.exports = {
  getAllProducts: async (req, res, next) => {
    if(req.query.name){
      try {
          const name = req.query.name
          const regex = new RegExp(`${name}+`, 'i') // i for case insensitive
          const product = await Product.find({name: {$regex: regex}})
          return res.json(product);
        } catch (error) {
          console.log(error);
        }
    } else {
      try {
        const product = await Product.find()
        return res.json(product);
      } catch (error) {
        console.log(error);
      }
    }
  }
}