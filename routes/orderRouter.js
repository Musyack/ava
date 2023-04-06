
const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/delete/:id', orderController.deleteOne)
router.get('/get/:id', orderController.getOne)


module.exports = router