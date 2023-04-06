const ApiError = require('../error/ApiError')
const {Order, User} = require('../models/models')
const {where} = require("sequelize");
class OrderController {
    async create (req, res, next) {
        const {link, quantity, time, price} = req.body
        if (!link || !quantity || !time){
            return next()
        }
        const candidate = await Order.findOne({where: {link}})
        if (candidate) {
            return next(ApiError.badRequest('Заказ с такой ссылкой уже существует'))
        }
        const order = await Order.create({link, time, quantity, price})
        return res.json({order})
    }


    async getAll(req, res, next) {

        const candidate = await Order.findAll()
        // if (candidate) {
        //     return next(ApiError.badRequest('Заказ с такой ссылкой уже существует'))
        // }
        // const order = await Order.create({link, time, quantity})
        return res.json({candidate})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        if (!id){
            return next()
        }
        const candidate = await Order.findOne({where: {id}})

        return res.json({candidate})
    }

    async deleteOne(req, res, next) {
        const {id} = req.params
        if (!id){
            return next()
        }
        const candidate = await Order.destroy({where: {id}})

        return res.json({candidate})
    }
}

module.exports = new OrderController()