const { Router } = require("express");

const router = Router();

const { searchProducts } = require("../controllers/General/searchProducts");
const { getProductDetail } = require("../controllers/General/getProductDetail");

const {createOrder, getOrders} = require("../controllers/General/orders");
const { payProducts } = require("../controllers/General/payProducts");

router.get("/", searchProducts);
router.get("/:id", getProductDetail);
router.post("/product/pay", payProducts);
router.post("/product/order", createOrder);
router.get("/product/order", getOrders);


module.exports = router;
