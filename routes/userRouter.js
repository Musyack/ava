const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/check', authMiddleware,  userController.check)
router.post('/balance', userController.updateBalance)
router.post('/get', userController.getUser)
module.exports = router
