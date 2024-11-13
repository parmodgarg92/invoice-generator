const express = require("express");
const { addProducts } = require("../controller/product");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/add", auth, addProducts);

module.exports = router;
