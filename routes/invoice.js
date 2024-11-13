const express = require("express");
// const { createInvoice, viewInvoices } = require("../controller/invoice");
const auth = require("../middlewares/auth");
const router = express.Router();

// router.post("/create", auth, createInvoice);
// router.get("/view", auth, viewInvoices);

module.exports = router;
