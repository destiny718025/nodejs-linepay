const { sequelize } = require('../models/index');

module.exports = class OrderRepository
{
    async create(payload)
    {
        const order = await sequelize.models.order.create({
            amount: payload.amount,
            currency: payload.currency,
            orderDetails: payload.products
        }, {
            include: [sequelize.models.orderDetail]
        });
        
        return order
    }

    async getById(id)
    {
        return await sequelize.models.order.findOne({
            where: {
                id: id
            },
            include: [{
                model: sequelize.models.orderDetail,
                attributes: ['name', 'quantity', 'price']
            }]
        });
    }
};