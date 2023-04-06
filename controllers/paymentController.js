const { v4: uuidv4 } = require('uuid');
const token = '620b21240852292a734730f687756005'
const axios = require('axios')
class PaymentController {

    async create (req, res, next){
        const {amount} = req.body
        let formData = new FormData()
        formData.append('amount', amount);
        formData.append('shop_id', '207');
        const orderId  = uuidv4()

        formData.append('token', token)
        formData.append('order_id', orderId);
        const result = await axios({
            method: 'post',
            withCredentials: true,
            headers: {
                'Sec-Fetch-Mode': "navigate",
            },

            url: 'https://lk.rukassa.pro/api/v1/create',

            data: new URLSearchParams({

                order_id: orderId,
                amount: amount,
                token,
                shop_id: 209

            })


        })
        const url = result.data.url

        return res.json({url})




    }

}

module.exports = new PaymentController();