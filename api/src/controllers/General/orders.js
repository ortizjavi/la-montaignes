const mp = require('../../utils/mercadopago');
const Order = require("../../models/Orders");
const User = require("../../models/Users/User");

module.exports = {
    createOrder: async (req, res, next) => {

        const { cart, user, address, mercadopago } = req.body

        //products, user, status(creado por default)
        try {
            let preference_id = '';
            let mp_link = '';
            let status = 'Procesando';
            if (mercadopago){
                status = 'Creada';
                const mpResponse = await mp(cart);
                preference_id = mpResponse.body.id;
                mp_link = mpResponse.response.init_point
            }
            
            const order = new Order({ 
                cart, 
                user,
                address,
                mp_preference: preference_id,
                status 
            });

            const saveOrder = await order.save();
            const { ...orderProps } = saveOrder._doc;
            await User.findByIdAndUpdate(user,
                { $push: { 'orders': saveOrder._id } }
            )

            if (!mercadopago){
                req.order = saveOrder;
                req.res = {
                    ok: true,
                    order: orderProps,
                    mp_link: mp_link
                }
                next();
            }
        } catch (error) {
            console.log(error)
            res.json({
                ok: false
            })
        }
    },

    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders)
        } catch (error) {
            console.log(error)
        }
    },
    updateOrders: async (req, res, next) => {
        const { id } = req.params;
        const update = { ...req.body }
        try {
            const newOrder = await Order.findByIdAndUpdate(id, update, { new: true })

            req.res = {
                ok: true,
                orders: newOrder
            }
            if (update.status === 'Completa'){
                req.order = newOrder;
                next();
            }
            res.json(req.res);
        } catch (error) {
            console.log(error)
            res.json({ ok: false })
        }

    }
};
