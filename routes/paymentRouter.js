const Router = require('express')
const paymentController = require("../controllers/paymentController");

const router = new Router()

router.post('/', paymentController.create)
module.exports = router