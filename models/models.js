const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    balance: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    link: {type: DataTypes.STRING, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    time: {type: DataTypes.INTEGER, defaultValue: 30},
    price: {type: DataTypes.INTEGER, allowNull: false}
})


const Payment = sequelize.define('payment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING, defaultValue: "awaiting"}
})
User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Payment)
Payment.belongsTo(User)

module.exports = {
    User,
    Order,
    Payment
}