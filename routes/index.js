const Router = require('express')
const router = new Router()
const userRouter = require('../routes/userRouter')
const orderRouter = require('../routes/orderRouter')
const paymentRouter = require('../routes/paymentRouter')

router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/payment', paymentRouter)

module.exports = router
