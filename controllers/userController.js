const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const token = generateJwt(user.id, user.email)
        return res.json({token, user})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token, user})
    }

    async updateBalance(req, res, next) {
        const {email, balance} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const newBalance = parseInt(balance)
        console.log(newBalance)
        const current = user.dataValues.balance
        console.log(current)
        const total = newBalance + current
        console.log(total)
        await user.update({balance: total})

        await user.save()

        return res.json({total})
    }


    async updateBalance(req, res, next) {
        const {email, balance} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const newBalance = parseInt(balance)
        // console.log(newBalance)
        const current = user.dataValues.balance
        // console.log(current)

        const total = newBalance + current
        if (newBalance < 0){
            if (total < 0){
                return next(ApiError.internal('Не хватает средств для пополнения'))
            }
        }
        // console.log(total)
        await user.update({balance: total})

        await user.save()

        return res.json({total})
    }

    async getUser(req, res, next) {
        const {email} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }


        return res.json({user})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}


module.exports = new UserController()
