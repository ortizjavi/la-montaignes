const Product = require('../../../models/Product');

module.exports = {
  updateProduct: async (req, res, next) => {
    const { id } = req.params;
    const update = { ...req.body }
    try {
        //const productoEncontrado = await Product.findById(productId);
        const productoActualizado = await Product.findByIdAndUpdate(id, update,{new:true})
        res.json({
            ok: true,
            product: productoActualizado
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false
        })
    }
  }
}
