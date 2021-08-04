const Product = require('../../../models/Product');

module.exports = {
  deleteProduct: async (req, res, next) => {
    const { productId } = req.params;
    try {
        await Product.findByIdAndDelete(productId)
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false
        })
    }
  }
}
